import * as S from "./styles";
import { useTheme } from "styled-components";
import FieldFormik from "../../components/FieldFormik";
import { Formik } from "formik";
import BasicButton from "../../components/BasicButton";
import CardRecipe from "../../components/CardRecipe";
import {
  ArrowBigRightDash,
  Heart,
  PlusCircle,
  Search,
  User,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import type { ShowResult } from "../../api/Recipes/types/recipes.interface";
import { handleCreate, handleGetList } from "../../api/Recipes/recipes.service";
import { DelishareContext } from "../../contexts/delishareContext";

const initialValues = {
  createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  recipeName: "",
  meal: "",
  time: "",
  difficulty: "",
  description: "",
  img: "",
  search: "",
};

const options = {
  meal: [
    { title: "Selecione", value: "" },
    { title: "Café", value: "Café" },
    { title: "Almoço", value: "Almoço" },
    { title: "Lanche", value: "Lanche" },
    { title: "Janta", value: "Janta" },
  ],
  difficulty: [
    { title: "Selecione", value: "" },
    { title: "Fácil", value: "Fácil" },
    { title: "Médio", value: "Médio" },
    { title: "Difícil", value: "Difícil" },
  ],
};

export default function Recipes() {
  const { userInfo } = useContext(DelishareContext);
  const theme = useTheme();

  const [list, setList] = useState<ShowResult[]>([]);
  const [filteredList, setFilteredList] = useState<ShowResult[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await handleGetList();

      if (response.result) {
        setList(response.data);
        setFilteredList(response.data);
      }
    };

    fetchData();
  }, []);

  return (
    <S.Container>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        enableReinitialize
      >
        {({ values, handleChange, resetForm }) => {
          const handleSearch = () => {
            const normalizeText = (text: string) =>
              text
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();

            const term = normalizeText(values.search || "");

            const filtered = list.filter(
              (item) =>
                normalizeText(item.recipeName).includes(term) ||
                normalizeText(item.meal).includes(term) ||
                normalizeText(item.description).includes(term)
            );

            setFilteredList(filtered);
          };

          return (
            <>
              <S.DivTop>
                <S.Title>Receitas</S.Title>
                <S.Description>
                  Descubra, organize e compartilhe suas receitas favoritas
                </S.Description>

                <S.Form>
                  <FieldFormik
                    color={theme.font.colors.secondaryText}
                    heightSize="small"
                    widthSize="fullWidth"
                    bgColor={theme.colors.background}
                    name="search"
                    type="string"
                    placeholder="Procure receitas"
                    onChange={handleChange}
                  />

                  <BasicButton
                    gap="1rem"
                    icon={<Search size={15} />}
                    bgColorHover={theme.colors.blueSchema.default}
                    height="medium"
                    borderColor={true}
                    bgColor={theme.colors.background}
                    font="medium"
                    width="medium"
                    textColor={theme.font.colors.secondaryText}
                    onClick={handleSearch}
                  >
                    Buscar
                  </BasicButton>
                </S.Form>

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
                    onClick={() => setFilteredList(list)}
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
                    onClick={() => {
                      const mine = list.filter(
                        (recipe) => recipe.userId === userInfo.id
                      );
                      setFilteredList(mine);
                    }}
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

                  <BasicButton
                    gap="1rem"
                    icon={<PlusCircle size={15} />}
                    bgColorHover={theme.colors.blueSchema.default}
                    height="small"
                    bgColor={theme.colors.background}
                    font="medium"
                    width="medium"
                    textColor={theme.font.colors.secondaryText}
                    onClick={() => setIsCreate(!isCreate)}
                  >
                    {!isCreate ? "Criar" : "Voltar"}
                  </BasicButton>
                </S.Buttons>
              </S.DivTop>

              {isCreate ? (
                <S.CreateFormContainer>
                  <FieldFormik
                    color={theme.font.colors.secondaryText}
                    heightSize="small"
                    widthSize="fullWidth"
                    bgColor={theme.colors.background}
                    name="meal"
                    type="select"
                    options={options.meal}
                    onChange={handleChange}
                  />

                  <FieldFormik
                    color={theme.font.colors.secondaryText}
                    heightSize="small"
                    widthSize="fullWidth"
                    bgColor={theme.colors.background}
                    name="recipeName"
                    type="string"
                    placeholder="Nome da Receita"
                    onChange={handleChange}
                  />

                  <FieldFormik
                    color={theme.font.colors.secondaryText}
                    heightSize="small"
                    widthSize="fullWidth"
                    bgColor={theme.colors.background}
                    name="time"
                    type="string"
                    placeholder="Tempo de Preparo (minutos)"
                    onChange={handleChange}
                  />

                  <FieldFormik
                    color={theme.font.colors.secondaryText}
                    heightSize="small"
                    widthSize="fullWidth"
                    bgColor={theme.colors.background}
                    name="difficulty"
                    type="select"
                    options={options.difficulty}
                    onChange={handleChange}
                  />

                  <FieldFormik
                    color={theme.font.colors.secondaryText}
                    heightSize="small"
                    widthSize="fullWidth"
                    bgColor={theme.colors.background}
                    name="description"
                    type="string"
                    placeholder="Descrição, ingredientes ou instruções"
                    onChange={handleChange}
                  />

                  <FieldFormik
                    color={theme.font.colors.secondaryText}
                    heightSize="small"
                    widthSize="fullWidth"
                    bgColor={theme.colors.background}
                    name="img"
                    type="string"
                    placeholder="Imagem da Receita (URL)"
                    onChange={handleChange}
                  />

                  <BasicButton
                    gap="1rem"
                    icon={<ArrowBigRightDash size={25} />}
                    height="small"
                    bgColor={theme.colors.gradientBackground}
                    font="small"
                    width="medium"
                    textColor={theme.font.colors.whiteText}
                    onClick={async () => {
                      const response = await handleCreate({
                        userId: userInfo.id,
                        createdAt: new Date().toISOString(),
                        recipeName: values.recipeName,
                        meal: values.meal,
                        time: values.time,
                        difficulty: values.difficulty,
                        description: values.description,
                        img: values.img,
                      });

                      if (response.result) {
                        setIsCreate(false);
                        resetForm();
                      }
                    }}
                  />
                </S.CreateFormContainer>
              ) : (
                <S.Results>
                  {filteredList.map((recipe) => (
                    <div key={recipe.id}>
                      <CardRecipe
                        difficulty={recipe.difficulty}
                        meal={recipe.meal}
                        time={recipe.time}
                        img={{ src: recipe.img, alt: recipe.recipeName }}
                        name={recipe.recipeName}
                      />
                    </div>
                  ))}
                </S.Results>
              )}
            </>
          );
        }}
      </Formik>
    </S.Container>
  );
}
