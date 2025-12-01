import * as S from "./styles";
import { Formik } from "formik";
import FieldFormik from "../../../../components/FieldFormik";
import { ChefHat, LockIcon, Mail } from "lucide-react";
import { useTheme } from "styled-components";
import BasicButton from "../../../../components/BasicButton";
import type { IBodyLogin } from "../../../../api/Login/types/login.interface";
import { loginService } from "../../../../api/Login/login.service";
import { useDelishare } from "../../../../hooks/useProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleCreateUpdate } from "../../../../api/User/user.service";
import { TextAlignJustify, User } from "phosphor-react";

export default function SignIn() {
  const theme = useTheme();
  const navigate = useNavigate();
  const create = handleCreateUpdate;
  const { setIsAuthenticated } = useDelishare();

  const [createUser, setIsCreateUser] = useState(false);

  const initialValues = {
    email: "",
    password: "",

    bio: "",
    isCreate: true,
    name: "",
  };

  const handleLogin = async (body: IBodyLogin) => {
    try {
      const { data, result } = await loginService.login(body);
      if (result) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setIsAuthenticated(true);
        navigate("/Delishare");
      }
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return (
    <S.Container isCreate={createUser}>
      <S.Header>
        <S.IconDiv>
          <ChefHat color="white" />
        </S.IconDiv>
        <S.H1>Bem-vindo!</S.H1>
        <S.H2>
          {createUser
            ? "Crie uma conta para compartilhar e descobrir novas receitas!"
            : "Entre na sua conta para compartilhar e descobrir novas receitas!"}
        </S.H2>
      </S.Header>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          if (!createUser) {
            handleLogin({ email: values.email, password: values.password });
            return;
          }

          const response = await create({
            bio: values.bio,
            email: values.email,
            isCreate: true,
            name: values.name,
            password: values.password,
            pfp: "",
          });

          if (response.result) {
            setIsCreateUser(false);
          }
        }}
        enableReinitialize
      >
        {(formik) => (
          <S.Form>
            <FieldFormik
              leftIcon={
                <Mail color={theme.colors.blueSchema.default} size={14} />
              }
              labelPosition="top"
              heightSize="xxsmall"
              widthSize="fullWidth"
              label="Email"
              name="email"
              type="string"
              onChange={formik.handleChange}
            />

            <FieldFormik
              leftIcon={
                <LockIcon color={theme.colors.blueSchema.default} size={14} />
              }
              labelPosition="top"
              heightSize="xxsmall"
              widthSize="fullWidth"
              label="Senha"
              name="password"
              type="password"
              onChange={formik.handleChange}
            />

            {createUser ? (
              <S.CreateForm>
                <FieldFormik
                  leftIcon={
                    <User color={theme.colors.blueSchema.default} size={14} />
                  }
                  labelPosition="top"
                  heightSize="xxsmall"
                  widthSize="fullWidth"
                  label="Nome de Usuário"
                  name="name"
                  type="string"
                  onChange={formik.handleChange}
                />

                <FieldFormik
                  leftIcon={
                    <TextAlignJustify
                      color={theme.colors.blueSchema.default}
                      size={14}
                    />
                  }
                  labelPosition="top"
                  heightSize="xxsmall"
                  widthSize="fullWidth"
                  label="Descrição"
                  name="bio"
                  type="string"
                  onChange={formik.handleChange}
                />
              </S.CreateForm>
            ) : null}

            <BasicButton
              onClick={formik.handleSubmit}
              height="small"
              textColor={theme.font.colors.whiteText}
              bgColor={theme.colors.gradientBackground}
              font="small"
              width="fullWidth"
            >
              Entrar
            </BasicButton>
          </S.Form>
        )}
      </Formik>

      <S.Footer>
        {createUser ? (
          <S.P>
            Já tem uma conta?{" "}
            <S.A onClick={() => setIsCreateUser(false)}>Entre</S.A>
          </S.P>
        ) : (
          <S.P>
            Não tem uma Conta?{" "}
            <S.A onClick={() => setIsCreateUser(true)}>Cadastre-se</S.A>
          </S.P>
        )}
      </S.Footer>
    </S.Container>
  );
}
