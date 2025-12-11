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
import { compressImage } from "../../Util/convertImage";

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
  const storedUser = localStorage.getItem("userInfo");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const [list, setList] = useState<ShowResult[]>([]);
  const [filteredList, setFilteredList] = useState<ShowResult[]>([]);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "mine" | null>(null);
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
      // Se não houver dados, adiciona receitas mockadas
      if (response.data.length === 0) {
        const mockRecipes = [
          {
            id: 1,
            userId: 1,
            recipeName: "Salada Mediterrânea com Queijo Feta",
            description:
              "Uma salada refrescante e nutritiva inspirada na culinária mediterrânea. Combina vegetais frescos, queijo feta cremoso e um toque de azeite de oliva extra virgem. Perfeita para um jantar leve e saudável.",
            meal: "Jantar" as const,
            difficulty: "Fácil" as const,
            time: "15",
            img: "/salad.jpg",
            instructions:
              "1. Lave e corte os tomates cereja ao meio\n2. Corte o pepino em cubos médios\n3. Corte a cebola roxa em fatias finas\n4. Lave e seque as folhas de rúcula\n5. Em uma tigela grande, misture todos os vegetais\n6. Adicione o queijo feta cortado em cubos\n7. Tempere com azeite de oliva, sal, pimenta e orégano\n8. Misture delicadamente e sirva imediatamente",
            createdAt: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
          {
            id: 2,
            userId: 2,
            recipeName: "Macarrão ao Molho Pesto Cremoso",
            description:
              "Um prato italiano clássico com um toque cremoso. O pesto tradicional de manjericão é combinado com creme de leite para criar um molho sedoso e saboroso. Ideal para um almoço especial ou jantar romântico.",
            meal: "Almoço" as const,
            difficulty: "Médio" as const,
            time: "30",
            img: "/creamyPesto.jpg",
            instructions:
              "1. Cozinhe o macarrão conforme as instruções da embalagem até ficar al dente\n2. Enquanto isso, prepare o pesto: bata no liquidificador manjericão, alho, pinoli, azeite e queijo parmesão\n3. Em uma panela, aqueça o creme de leite em fogo médio\n4. Adicione o pesto ao creme de leite e misture bem\n5. Escorra o macarrão e reserve um pouco da água do cozimento\n6. Adicione o macarrão à panela com o molho\n7. Se necessário, adicione um pouco da água do cozimento para ajustar a consistência\n8. Misture bem, finalize com queijo parmesão ralado e sirva",
            createdAt: new Date(
              Date.now() - 1 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
          {
            id: 3,
            userId: 3,
            recipeName: "Torrada de Abacate com Ovos Pochê",
            description:
              "Um café da manhã nutritivo e delicioso que combina a cremosidade do abacate com a suavidade dos ovos pochê. Uma refeição completa que fornece energia para começar o dia com disposição.",
            meal: "Café" as const,
            difficulty: "Médio" as const,
            time: "15",
            img: "/avocadoToast.jpg",
            instructions:
              "1. Toaste o pão até ficar dourado e crocante\n2. Corte o abacate ao meio, remova o caroço e retire a polpa\n3. Amasse o abacate com um garfo, adicionando suco de limão, sal e pimenta\n4. Em uma panela com água fervente, adicione vinagre\n5. Crie um redemoinho na água e quebre o ovo no centro\n6. Cozinhe por 3-4 minutos até a clara estar firme e a gema ainda cremosa\n7. Espalhe o abacate amassado sobre a torrada\n8. Coloque o ovo pochê por cima\n9. Tempere com sal, pimenta e sementes de gergelim (opcional)\n10. Sirva imediatamente",
            createdAt: new Date().toISOString(),
          },
        ];
        setList(mockRecipes);
        setFilteredList(applyOrder(mockRecipes));
      } else {
        setList(response.data);
        setFilteredList(applyOrder(response.data));
      }
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
          const handleImage = async (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            const file = e.target.files?.[0];
            if (!file) return;

            try {
              // Comprime a imagem antes de salvar
              const compressedFile = await compressImage(file);
              setImageFile(compressedFile);
              setPreview(URL.createObjectURL(compressedFile));
            } catch (error) {
              console.error("Erro ao processar imagem:", error);
              // Em caso de erro, usa o arquivo original
              setImageFile(file);
              setPreview(URL.createObjectURL(file));
            }
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
                      if (!parsedUser?.id) {
                        return;
                      }

                      const response = await handleCreate({
                        userId: parsedUser.id,
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
                <>
                  {filteredList.length > 0 ? (
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
                  ) : (
                    <S.EmptyState>
                      <S.EmptyMessage>
                        Nenhuma receita encontrada. Que tal criar a primeira?
                      </S.EmptyMessage>
                    </S.EmptyState>
                  )}
                </>
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
