import * as S from "./styles";
import { useTheme } from "styled-components";
import FieldFormik from "../../../../components/FieldFormik";
import { Formik } from "formik";
import BasicButton from "../../../../components/BasicButton";
import { ChefHat } from "lucide-react";
export default function MainSlide() {
  const theme = useTheme();

  const initialValues = {
    search: "",
  };
  return (
    <S.Container>
      <S.DivText>
        <S.Phrase>Receitas incríveis para todas ocasiões</S.Phrase>
        <S.Description>
          Explore nossa coleção de receitas, fáceis de preparar e perfeitas para
          qualquer dia da semana.
        </S.Description>

        <Formik initialValues={initialValues} onSubmit={() => {}}>
          <FieldFormik
            color={theme.font.colors.whiteText}
            heightSize="small"
            bgColor={theme.colors.white3}
            name="search"
            type="string"
            placeholder="Procure receitas, ingredientes ou categorias"
          />
        </Formik>
        <BasicButton
          height="medium"
          bgColor={theme.colors.background}
          font="medium"
          width="large"
          textColor={theme.font.colors.DarkBlue}
        >
          Explorar Receitas
        </BasicButton>
      </S.DivText>

      <S.DivImage>
        <S.Icon>
          <ChefHat size={45} color={theme.font.colors.lightBlue} />
        </S.Icon>
      </S.DivImage>
    </S.Container>
  );
}
