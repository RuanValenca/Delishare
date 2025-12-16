import { useState, type Dispatch, type SetStateAction } from "react";
import * as S from "./styles";
import { Formik, Form } from "formik";
import FieldFormik from "../../components/FieldFormik";
import { useTheme } from "styled-components";
import BasicButton from "../BasicButton";
import { ImagePlus, Send, User, Loader2 } from "lucide-react";
import { handleCreate, handleGetList } from "../../api/Feed/feed.service";
import { compressImage } from "../../Util/convertImage";
import type { ShowResult } from "../../api/Feed/types/feed.interface";
import { successToast, errorToast } from "../Toast";

interface Props {
  setList: Dispatch<SetStateAction<ShowResult[]>>;
}

const initialValues = {
  description: "",
};

export default function FeedCreate(props: Props) {
  const theme = useTheme();
  const submit = handleCreate;
  const show = handleGetList;
  const storedUser = localStorage.getItem("userInfo");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  const nowBR = new Date(Date.now() - 3 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedFile = await compressImage(file);
      setImageFile(compressedFile);
      setPreview(URL.createObjectURL(compressedFile));
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
      errorToast("Erro ao processar imagem. Tente novamente.");
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <S.Container>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setFieldValue }) => {
          if (isPosting) return;

          setIsPosting(true);

          try {
            if (!parsedUser?.id) {
              errorToast(
                "Erro ao identificar o usuário. Faça login novamente."
              );
              setIsPosting(false);
              return;
            }

            const body = {
              description: values.description,
              userId: parsedUser.id,
              createdAt: nowBR,
              image: imageFile || undefined,
            };

            const response = await submit(body);

            if (response?.result) {
              successToast("Post publicado com sucesso!");

              setFieldValue("description", "");
              if (preview) {
                URL.revokeObjectURL(preview);
              }
              setImageFile(null);
              setPreview(null);

              const reqShow = await show();
              props.setList(reqShow.data);

              await new Promise((resolve) => setTimeout(resolve, 2000));
            } else {
              const errorMessage =
                response?.message && response.message.length > 0
                  ? response.message[0]
                  : "Erro ao publicar post";
              errorToast(errorMessage);
            }
          } catch (error) {
            console.error("Erro ao postar:", error);
            errorToast(
              "Não foi possível publicar seu post. Verifique sua conexão e tente novamente."
            );
          } finally {
            setIsPosting(false);
          }
        }}
      >
        {({ handleChange, values, handleSubmit }) => (
          <Form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          >
            <S.InfoTop>
              {parsedUser?.pfp ? (
                <S.Photo src={parsedUser.pfp} />
              ) : (
                <S.PhotoPlaceholder>
                  <User size={24} color={theme.font.colors.DarkBlue} />
                </S.PhotoPlaceholder>
              )}
              {parsedUser?.name}
            </S.InfoTop>

            <FieldFormik
              heightSize="xsmall"
              widthSize="fullWidth"
              type="string"
              name="description"
              placeholder="O que você está pensando?"
              onChange={handleChange}
            />

            <S.BottomRow>
              <S.ImageButton htmlFor="fileInput">
                <ImagePlus size={22} />
                <span>Anexar imagem</span>
              </S.ImageButton>

              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImage}
              />

              <BasicButton
                disabled={
                  (values.description === "" && !imageFile) || isPosting
                }
                type="button"
                icon={
                  isPosting ? (
                    <S.LoadingIcon>
                      <Loader2 size={25} />
                    </S.LoadingIcon>
                  ) : (
                    <Send size={20} />
                  )
                }
                height="medium"
                bgColor={theme.colors.gradientBackground}
                font="small"
                width="medium"
                textColor={theme.font.colors.whiteText}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {isPosting ? null : "Postar"}
              </BasicButton>
            </S.BottomRow>

            {preview && (
              <S.ImagePreview>
                <img src={preview} alt="preview" />

                <S.RemoveButton
                  type="button"
                  onClick={() => {
                    if (preview) {
                      URL.revokeObjectURL(preview);
                    }
                    setPreview(null);
                    setImageFile(null);
                  }}
                >
                  X
                </S.RemoveButton>
              </S.ImagePreview>
            )}
          </Form>
        )}
      </Formik>
    </S.Container>
  );
}
