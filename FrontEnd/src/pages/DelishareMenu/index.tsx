import MainSlide from "./components/MainSlide";
import MainRecipes from "./components/MainRecipes";
import * as S from "./styles";
export default function DelishareMenu() {
  return (
    <S.Container>
      <MainSlide />
      <MainRecipes />
    </S.Container>
  );
}
