import * as S from "./styles";
import CardRecipe from "../../../../components/CardRecipe";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function MainRecipes() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.DivText>
        <S.Title>Receitas em Destaque</S.Title>
        <S.Description>
          Confira as receitas mais populares e amadas pela nossa comunidade.
        </S.Description>
      </S.DivText>
      <S.DivCard>
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
        <CardRecipe
          difficulty="Médio"
          meal="Café da manhã"
          time="15"
          img={{
            src: "src/assets/img/avocadoToast.jpg",
            alt: "Nome da receita",
          }}
          name="Torrada de Abacate com Ovos Pochê"
        />
      </S.DivCard>
      <S.Link onClick={() => navigate("/recipes")}>
        Ver todas Receitas <ArrowRight size={20} />
      </S.Link>
    </S.Container>
  );
}
