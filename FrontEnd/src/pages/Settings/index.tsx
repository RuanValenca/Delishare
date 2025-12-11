import * as S from "./styles";
import BasicButton from "../../components/BasicButton";
import FieldFormik from "../../components/FieldFormik";
import { Formik } from "formik";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { handleCreateUpdate, handleGetUser } from "../../api/User/user.service";
import { useEffect, useRef, useState } from "react";
import { useDelishare } from "../../hooks/useProvider";
import { compressImage } from "../../Util/convertImage";

interface UserData {
  name: string;
  bio: string;
  email: string;
  password: string;
  id: number;
  pfp: string;
}

export default function Settings() {
  const { userInfo } = useDelishare();
  const update = handleCreateUpdate;
  const theme = useTheme();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userDataRaw = localStorage.getItem("userInfo");
  const stored = userDataRaw ? JSON.parse(userDataRaw) : null;

  const [user, setUser] = useState<UserData | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    stored?.profilePhoto ?? null
  );

  useEffect(() => {
    async function fetchUser() {
      const { data, result } = await handleGetUser(userInfo.id);
      if (result) {
        setUser({
          name: data.name,
          bio: data.bio,
          email: data.email,
          password: data.password,
          id: userInfo.id,
          pfp: data.pfp,
        });
      }
    }
    fetchUser();
  }, [userInfo.id]);

  const initialValues = {
    name: stored?.name ?? "",
    bio: stored?.bio ?? "",
    email: stored?.email ?? "",
    password: user?.password ?? "",
    pfp: stored?.profilePhoto ?? "",
  };

  return (
    <S.Container>
      <S.DivTop>
        <S.ButtonBack>
          <BasicButton
            borderColor
            bgColorHover={theme.colors.greenSchema.light}
            icon={<ArrowLeft />}
            onClick={() => navigate(-1)}
            textColor={theme.font.colors.mainText}
            height={"medium"}
            width={"small"}
            bgColor={theme.colors.background}
          />
        </S.ButtonBack>
        <S.DivText>
          <S.Title>Configurações</S.Title>
          <S.Description>Gerencie as informações do seu perfil</S.Description>
        </S.DivText>
      </S.DivTop>

      <S.DivInfo>
        <S.TitleInfo>Perfil</S.TitleInfo>
        <S.Info>
          <S.DivImage>
            <S.Img src={preview || user?.pfp} />

            <S.Icon onClick={() => fileInputRef.current?.click()}>
              <Camera size={20} color={theme.font.colors.mainText} />
            </S.Icon>
          </S.DivImage>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                try {
                  const compressedFile = await compressImage(file);
                  setSelectedImageFile(compressedFile);
                  const previewUrl = URL.createObjectURL(compressedFile);
                  setPreview(previewUrl);
                } catch (error) {
                  console.error("Erro ao processar imagem:", error);
                  setSelectedImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }
              }
            }}
          />

          <S.Form>
            {user && (
              <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={async (values) => {
                  const response = await update({
                    bio: values.bio,
                    email: values.email,
                    isCreate: false,
                    name: values.name,
                    password: values.password,
                    userId: userInfo.id,
                    pfp: selectedImageFile || undefined,
                  });

                  if (response.result) {
                    const currentUser = localStorage.getItem("userInfo");
                    const parsedUser = currentUser
                      ? JSON.parse(currentUser)
                      : {};

                    const updatedUser = {
                      ...parsedUser,
                      bio: values.bio,
                      email: values.email,
                      name: values.name,
                      profilePhoto: user?.pfp || "",
                    };

                    localStorage.setItem(
                      "userInfo",
                      JSON.stringify(updatedUser)
                    );
                    setUser((prev) =>
                      prev ? { ...prev, ...updatedUser } : null
                    );
                  }
                }}
              >
                {(formik) => (
                  <>
                    <FieldFormik
                      placeholder="Digite seu nome"
                      heightSize="xsmall"
                      widthSize="fullWidth"
                      name="name"
                      type="string"
                      label="Nome"
                      labelPosition="top"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />

                    <FieldFormik
                      placeholder="Digite uma nova descrição"
                      heightSize="xsmall"
                      widthSize="fullWidth"
                      name="bio"
                      type="string"
                      label="Descrição"
                      labelPosition="top"
                      onChange={formik.handleChange}
                      value={formik.values.bio}
                    />

                    <FieldFormik
                      placeholder="Altere seu Email"
                      heightSize="xsmall"
                      widthSize="fullWidth"
                      name="email"
                      type="string"
                      label="E-mail"
                      labelPosition="top"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />

                    <FieldFormik
                      placeholder="Altere sua Senha"
                      heightSize="xsmall"
                      widthSize="fullWidth"
                      name="password"
                      type="password"
                      label="Senha"
                      labelPosition="top"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />

                    <BasicButton
                      height="small"
                      icon={<Save size={20} />}
                      type="submit"
                      textColor={theme.font.colors.whiteText}
                      width={"fullWidth"}
                      bgColor={theme.colors.gradientBackground}
                      onClick={formik.handleSubmit}
                    >
                      Salvar Alterações
                    </BasicButton>
                  </>
                )}
              </Formik>
            )}
          </S.Form>
        </S.Info>
      </S.DivInfo>
    </S.Container>
  );
}
