import * as S from "./styles";
import { useTheme } from "styled-components";
import FieldFormik from "../../components/FieldFormik";
import { Formik } from "formik";
import BasicButton from "../../components/BasicButton";
import CardRecipe from "../../components/CardRecipe";
import { Heart, Search, User } from "lucide-react";
export default function Recipes() {
  const theme = useTheme();

  const initialValues = {
    search: "",
  };
  return (
    <S.Container>
      <S.DivTop>
        <S.Title>Receitas</S.Title>
        <S.Description>
          Descubra, organize e compartilhe suas receitas favoritas
        </S.Description>

        <Formik initialValues={initialValues} onSubmit={() => {}}>
          <S.Form>
            <FieldFormik
              color={theme.font.colors.secondaryText}
              heightSize="small"
              widthSize="fullWidth"
              bgColor={theme.colors.background}
              name="search"
              type="string"
              placeholder="Procure receitas, ingredientes ou categorias"
            />
          </S.Form>
        </Formik>
        <S.Buttons>
          <BasicButton
            gap="1rem"
            icon={<Search size={15} />}
            bgColorHover={theme.colors.blueSchema.default}
            height="small"
            bgColor={theme.colors.background}
            font="medium"
            width="medium"
            textColor={theme.font.colors.secondaryText}
          >
            Todas
          </BasicButton>
          <BasicButton
            gap="1rem"
            icon={<User size={15} />}
            bgColorHover={theme.colors.blueSchema.default}
            height="small"
            bgColor={theme.colors.background}
            font="medium"
            width="medium"
            textColor={theme.font.colors.secondaryText}
          >
            Minhas
          </BasicButton>
          <BasicButton
            gap="1rem"
            icon={<Heart size={15} />}
            bgColorHover={theme.colors.blueSchema.default}
            height="small"
            bgColor={theme.colors.background}
            font="medium"
            width="medium"
            textColor={theme.font.colors.secondaryText}
          >
            Curtidas
          </BasicButton>
        </S.Buttons>
      </S.DivTop>
      <S.Results>
        <CardRecipe
          difficulty="Fácil"
          meal="Jantar"
          time="15"
          img={{
            src: "src/assets/img/salad.jpg",
            alt: "Nome da receita",
          }}
          name="Salada Mediterrânea com Queijo Feta"
        />
        <CardRecipe
          difficulty="Médio"
          meal="Almoço"
          time="30"
          img={{
            src: "src/assets/img/creamyPesto.jpg",
            alt: "Nome da receita",
          }}
          name="Macarrão ao Molho Pesto Cremoso"
        />
      </S.Results>
    </S.Container>
  );
}
