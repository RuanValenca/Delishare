import { useState } from "react";
import * as S from "./styles";
import CardRecipe from "../../../../components/CardRecipe";
import RecipeModal from "../../../../components/RecipeModal";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ShowResult } from "../../../../api/Recipes/types/recipes.interface";

// Receitas padrão do menu inicial
const featuredRecipes: ShowResult[] = [
  {
    id: 1,
    userId: 0,
    recipeName: "Salada Mediterrânea com Queijo Feta",
    description:
      "Uma salada refrescante e nutritiva inspirada na culinária mediterrânea. Combina vegetais frescos, queijo feta cremoso e um toque de azeite de oliva extra virgem. Perfeita para um jantar leve e saudável.",
    meal: "Jantar",
    difficulty: "Fácil",
    time: "15",
    img: "/salad.jpg",
    instructions:
      "1. Lave e corte os tomates cereja ao meio\n2. Corte o pepino em cubos médios\n3. Corte a cebola roxa em fatias finas\n4. Lave e seque as folhas de rúcula\n5. Em uma tigela grande, misture todos os vegetais\n6. Adicione o queijo feta cortado em cubos\n7. Tempere com azeite de oliva, sal, pimenta e orégano\n8. Misture delicadamente e sirva imediatamente",
    createdAt: new Date(),
  },
  {
    id: 2,
    userId: 0,
    recipeName: "Macarrão ao Molho Pesto Cremoso",
    description:
      "Um prato italiano clássico com um toque cremoso. O pesto tradicional de manjericão é combinado com creme de leite para criar um molho sedoso e saboroso. Ideal para um almoço especial ou jantar romântico.",
    meal: "Almoço",
    difficulty: "Médio",
    time: "30",
    img: "/creamyPesto.jpg",
    instructions:
      "1. Cozinhe o macarrão conforme as instruções da embalagem até ficar al dente\n2. Enquanto isso, prepare o pesto: bata no liquidificador manjericão, alho, pinoli, azeite e queijo parmesão\n3. Em uma panela, aqueça o creme de leite em fogo médio\n4. Adicione o pesto ao creme de leite e misture bem\n5. Escorra o macarrão e reserve um pouco da água do cozimento\n6. Adicione o macarrão à panela com o molho\n7. Se necessário, adicione um pouco da água do cozimento para ajustar a consistência\n8. Misture bem, finalize com queijo parmesão ralado e sirva",
    createdAt: new Date(),
  },
  {
    id: 3,
    userId: 0,
    recipeName: "Torrada de Abacate com Ovos Pochê",
    description:
      "Um café da manhã nutritivo e delicioso que combina a cremosidade do abacate com a suavidade dos ovos pochê. Uma refeição completa que fornece energia para começar o dia com disposição.",
    meal: "Café",
    difficulty: "Médio",
    time: "15",
    img: "/avocadoToast.jpg",
    instructions:
      "1. Toaste o pão até ficar dourado e crocante\n2. Corte o abacate ao meio, remova o caroço e retire a polpa\n3. Amasse o abacate com um garfo, adicionando suco de limão, sal e pimenta\n4. Em uma panela com água fervente, adicione vinagre\n5. Crie um redemoinho na água e quebre o ovo no centro\n6. Cozinhe por 3-4 minutos até a clara estar firme e a gema ainda cremosa\n7. Espalhe o abacate amassado sobre a torrada\n8. Coloque o ovo pochê por cima\n9. Tempere com sal, pimenta e sementes de gergelim (opcional)\n10. Sirva imediatamente",
    createdAt: new Date(),
  },
];

export default function MainRecipes() {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState<ShowResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <S.Container>
      <S.DivText>
        <S.Title>Receitas em Destaque</S.Title>
        <S.Description>
          Confira as receitas mais populares e amadas pela nossa comunidade.
        </S.Description>
      </S.DivText>
      <S.DivCard>
        {featuredRecipes.map((recipe) => (
          <CardRecipe
            key={recipe.id}
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
        ))}
      </S.DivCard>
      <S.Link onClick={() => navigate("/recipes")}>
        Ver todas Receitas <ArrowRight size={20} />
      </S.Link>

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecipe(null);
        }}
      />
    </S.Container>
  );
}
