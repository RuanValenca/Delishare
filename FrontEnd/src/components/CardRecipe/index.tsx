import { Clock, Utensils } from "lucide-react";
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
  onClick?: () => void;
}

export default function CardRecipe({
  img,
  name,
  meal,
  time,
  difficulty,
  onClick,
}: Props) {
  const hasImage = Boolean(img?.src && img.src.trim() !== "");

  return (
    <S.Container onClick={onClick}>
      <S.Background img={hasImage ? img?.src : undefined}>
        {!hasImage && <S.Fallback>{name}</S.Fallback>}
        <S.Meal>{meal}</S.Meal>
      </S.Background>
      <S.DescriptionBar>
        <S.Name>{name}</S.Name>
        <S.InfoWrapper>
          <S.Time>
            <Clock size={18} />
            {time} min
          </S.Time>
          <S.Difficulty>
            <Utensils size={18} />
            {difficulty}
          </S.Difficulty>
        </S.InfoWrapper>
      </S.DescriptionBar>
    </S.Container>
  );
}
