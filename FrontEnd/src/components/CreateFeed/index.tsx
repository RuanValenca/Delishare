import { useState, type Dispatch, type SetStateAction } from "react";
import * as S from "./styles";
import { Formik, Form } from "formik";
import FieldFormik from "../../components/FieldFormik";
import { useDelishare } from "../../hooks/useProvider";
import { useTheme } from "styled-components";
import BasicButton from "../BasicButton";
import { ImagePlus, Send } from "lucide-react";
import { handleCreate, handleGetList } from "../../api/Feed/feed.service";
import { fileToBase64 } from "../../Util/convertImage";
import type { ShowResult } from "../../api/Feed/types/feed.interface";

interface Props {
  setList: Dispatch<SetStateAction<ShowResult[]>>;
}

const initialValues = {
  description: "",
};

export default function FeedCreate(props: Props) {
  const { userInfo } = useDelishare();
  const theme = useTheme();
  const submit = handleCreate;
  const show = handleGetList;
  const storedUser = localStorage.getItem("userInfo");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const nowBR = new Date(Date.now() - 3 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const [imageFile, setImageFile] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await fileToBase64(file);

    setImageFile(base64);
    setPreview(base64);
  };

  return (
    <S.Container>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          const body = {
            description: values.description,
            userId: userInfo.id,
            createdAt: nowBR,
            imageUrl: imageFile || null,
          };

          await submit(body);

          resetForm();
          setImageFile(null);
          setPreview(null);

          const reqShow = await show();
          props.setList(reqShow.data);
        }}
      >
        {({ handleChange, values }) => (
          <Form>
            <S.InfoTop>
              {parsedUser?.profilePhoto && (
                <S.Photo src={parsedUser.profilePhoto} />
              )}
              {parsedUser?.name}
            </S.InfoTop>

            <FieldFormik
              heightSize="xsmall"
              widthSize="xlarge"
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
                disabled={values.description === "" && !imageFile}
                type="submit"
                icon={<Send size={20} />}
                height="medium"
                bgColor={theme.colors.gradientBackground}
                font="small"
                width="medium"
                textColor={theme.font.colors.whiteText}
              >
                Postar
              </BasicButton>
            </S.BottomRow>

            {preview && (
              <S.ImagePreview>
                <img src={preview} alt="preview" />

                <S.RemoveButton
                  type="button"
                  onClick={() => {
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
