import { Clock, ForkKnife } from "lucide-react";
import * as S from "./styles";

interface Props {
  img?: {
    src: string;
    alt: string;
  };
  name: string;
  meal: "Almoço" | "Jantar" | "Lanche" | "Café";
  time: string;
  difficulty: "Fácil" | "Médio" | "Difícil";
}

export default function CardRecipe({
  img,
  name,
  meal,
  time,
  difficulty,
}: Props) {
  return (
    <S.Container>
      <S.Background img={img?.src}>
        <S.Meal>{meal}</S.Meal>
      </S.Background>
      <S.DescriptionBar>
        <S.Name>{name}</S.Name>
        <S.Time>
          <Clock size={18} />
          {""}
          {time} min
        </S.Time>
        <S.Difficulty>
          <ForkKnife size={18} />
          {""} {difficulty}
        </S.Difficulty>
      </S.DescriptionBar>
    </S.Container>
  );
}
