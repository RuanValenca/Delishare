import * as S from "./styles";
import { useTheme } from "styled-components";
import FieldFormik from "../../components/FieldFormik";
import { Formik } from "formik";
import BasicButton from "../../components/BasicButton";
import CardRecipe from "../../components/CardRecipe";
import RecipeModal from "../../components/RecipeModal";
import {
  ArrowBigRightDash,
  ArrowUpDown,
  Heart,
  ImagePlus,
  PlusCircle,
  Search,
  User,
} from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import type { ShowResult } from "../../api/Recipes/types/recipes.interface";
import { handleCreate, handleGetList } from "../../api/Recipes/recipes.service";
import { DelishareContext } from "../../contexts/delishareContext";
import { useSearchParams } from "react-router-dom";

const initialValues = {
  createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
  recipeName: "",
  meal: "",
  time: "",
  difficulty: "",
  description: "",
  instructions: "",
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
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const theme = useTheme();

  const [list, setList] = useState<ShowResult[]>([]);
  const [filteredList, setFilteredList] = useState<ShowResult[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "mine" | "liked" | null
  >(null);
  const [selectedRecipe, setSelectedRecipe] = useState<ShowResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const applyOrder = useCallback(
    (data: ShowResult[]) => {
      return isReversed ? [...data].reverse() : data;
    },
    [isReversed]
  );

  const fetchData = useCallback(async () => {
    const response = await handleGetList();

    if (response.result) {
      setList(response.data);
      setFilteredList(applyOrder(response.data));
    }
  }, [applyOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Se veio um termo de busca pela URL, aplica o filtro automaticamente
  useEffect(() => {
    if (!urlSearch) return;

    const normalizeText = (text: string) =>
      text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const term = normalizeText(urlSearch);

    const filtered = list.filter(
      (item) =>
        normalizeText(item.recipeName).includes(term) ||
        normalizeText(item.meal).includes(term) ||
        normalizeText(item.description || "").includes(term) ||
        normalizeText(item.instructions || "").includes(term)
    );

    if (filtered.length > 0) {
      setFilteredList(applyOrder(filtered));
      setActiveFilter(null);
    }
  }, [urlSearch, list, isReversed, applyOrder]);

  return (
    <S.Container>
      <Formik
        initialValues={{ ...initialValues, search: urlSearch }}
        onSubmit={() => {}}
        enableReinitialize
      >
        {({ values, handleChange, resetForm }) => {
          const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setImageFile(file);
            setPreview(URL.createObjectURL(file));
          };

          const handleSearch = (termOverride?: string) => {
            const normalizeText = (text: string) =>
              text
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();

            const term = normalizeText(termOverride ?? values.search ?? "");

            const filtered = list.filter(
              (item) =>
                normalizeText(item.recipeName).includes(term) ||
                normalizeText(item.meal).includes(term) ||
                normalizeText(item.description || "").includes(term) ||
                normalizeText(item.instructions || "").includes(term)
            );

            const finalList = isReversed ? [...filtered].reverse() : filtered;
            setFilteredList(finalList);
            setActiveFilter(null);
          };

          const handleReverseOrder = () => {
            const newReversed = !isReversed;
            setIsReversed(newReversed);
            setFilteredList((prev) => [...prev].reverse());
          };

          return (
            <>
              <S.DivTop>
                <S.Title>Receitas</S.Title>
                <S.Description>
                  Descubra, organize e compartilhe suas receitas favoritas
                </S.Description>

                <S.Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                >
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
                    type="button"
                    gap="1rem"
                    icon={<Search size={15} />}
                    bgColorHover={theme.colors.blueSchema.default}
                    height="medium"
                    borderColor={true}
                    bgColor={theme.colors.background}
                    font="medium"
                    width="medium"
                    textColor={theme.font.colors.secondaryText}
                    onClick={() => handleSearch()}
                  >
                    Buscar
                  </BasicButton>
                </S.Form>

                <S.Buttons>
                  <BasicButton
                    gap="1rem"
                    icon={<PlusCircle size={15} />}
                    bgColorHover={theme.colors.blueSchema.default}
                    height="small"
                    bgColor={theme.colors.background}
                    font="medium"
                    width="medium"
                    textColor={theme.font.colors.secondaryText}
                    isActive={isCreate}
                    onClick={() => {
                      if (isCreate) {
                        // Se está fechando o formulário, volta para a lista completa
                        setIsCreate(false);
                        setActiveFilter(null);
                        setFilteredList(applyOrder(list));
                        setImageFile(null);
                        setPreview(null);
                      } else {
                        // Se está abrindo o formulário, fecha os filtros
                        setIsCreate(true);
                        setActiveFilter(null);
                      }
                    }}
                  >
                    {!isCreate ? "Criar" : "Voltar"}
                  </BasicButton>
                  <BasicButton
                    gap="1rem"
                    icon={<Search size={15} />}
                    bgColorHover={theme.colors.blueSchema.default}
                    height="small"
                    bgColor={theme.colors.background}
                    font="medium"
                    width="medium"
                    textColor={theme.font.colors.secondaryText}
                    isActive={activeFilter === "all"}
                    onClick={() => {
                      setFilteredList(list);
                      setActiveFilter("all");
                      setIsCreate(false);
                    }}
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
                    isActive={activeFilter === "mine"}
                    onClick={() => {
                      setActiveFilter("mine");
                      setIsCreate(false);

                      if (!userInfo?.id) {
                        setFilteredList(applyOrder([]));
                        return;
                      }

                      const mine = list.filter(
                        (recipe) =>
                          Number(recipe.userId) === Number(userInfo.id)
                      );
                      setFilteredList(applyOrder(mine));
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
                    isActive={activeFilter === "liked"}
                    onClick={() => {
                      // TODO: Implementar filtro de curtidas
                      setActiveFilter("liked");
                      setIsCreate(false);
                    }}
                  >
                    Curtidas
                  </BasicButton>

                  <S.ReverseButton
                    type="button"
                    onClick={handleReverseOrder}
                    title={isReversed ? "Ordem normal" : "Inverter ordem"}
                  >
                    <ArrowUpDown size={20} />
                  </S.ReverseButton>
                </S.Buttons>
              </S.DivTop>

              {isCreate ? (
                <S.CreateFormContainer>
                  <S.FormTitle>Criar Nova Receita</S.FormTitle>
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
                    placeholder="Descrição da receita"
                    onChange={handleChange}
                  />

                  <FieldFormik
                    color={theme.font.colors.secondaryText}
                    heightSize="textSmall"
                    widthSize="fullWidth"
                    bgColor={theme.colors.background}
                    name="instructions"
                    type="textarea"
                    placeholder="Instruções de preparo (passo a passo)"
                    onChange={handleChange}
                  />

                  <S.ImageUploadContainer>
                    <S.ImageButton htmlFor="recipeImageInput">
                      <ImagePlus size={22} />
                      <span>Anexar imagem</span>
                    </S.ImageButton>

                    <input
                      type="file"
                      id="recipeImageInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImage}
                    />

                    {preview && (
                      <S.ImagePreview>
                        <img src={preview} alt="Preview da receita" />
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
                  </S.ImageUploadContainer>

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
                        instructions: values.instructions,
                        image: imageFile || undefined,
                      });

                      if (response.result) {
                        setIsCreate(false);
                        resetForm();
                        setActiveFilter(null);
                        setImageFile(null);
                        setPreview(null);
                        // Atualiza a lista após criar uma receita
                        await fetchData();
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
                        img={
                          recipe.img && recipe.img.trim() !== ""
                            ? { src: recipe.img, alt: recipe.recipeName }
                            : undefined
                        }
                        name={recipe.recipeName}
                        onClick={() => {
                          setSelectedRecipe(recipe);
                          setIsModalOpen(true);
                        }}
                      />
                    </div>
                  ))}
                </S.Results>
              )}

              <RecipeModal
                recipe={selectedRecipe}
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                  setSelectedRecipe(null);
                }}
              />
            </>
          );
        }}
      </Formik>
    </S.Container>
  );
}
