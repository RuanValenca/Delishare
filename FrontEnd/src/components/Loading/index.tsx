import { ChefHat } from "lucide-react";
import * as S from "./styles";

export default function Loading() {
  return (
    <S.Container>
      <S.LoadingWrapper>
        <S.SpinnerRing />
        <S.IconWrapper>
          <S.GradientIcon>
            <ChefHat size={48} />
          </S.GradientIcon>
        </S.IconWrapper>
      </S.LoadingWrapper>
    </S.Container>
  );
}
