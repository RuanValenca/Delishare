import { X, Clock, ForkKnife } from "lucide-react";
import { useEffect } from "react";
import * as S from "./styles";
import type { ShowResult } from "../../api/Recipes/types/recipes.interface";

interface Props {
  recipe: ShowResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeModal({ recipe, isOpen, onClose }: Props) {
  // Bloquear scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup: restaurar scroll quando o componente desmontar
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !recipe) return null;

  const hasImage = Boolean(recipe.img && recipe.img.trim() !== "");
  const imageUrl = hasImage && recipe.img ? recipe.img : undefined;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer
        hasImage={hasImage}
        onClick={(e) => e.stopPropagation()}
      >
        <S.CloseButton onClick={onClose}>
          <X size={24} />
        </S.CloseButton>

        {hasImage ? (
          <>
            <S.ImageContainer img={imageUrl}>
              <S.MealBadge>{recipe.meal}</S.MealBadge>
            </S.ImageContainer>

            <S.Content>
              <S.Title>{recipe.recipeName}</S.Title>

              <S.InfoRow>
                <S.InfoItem>
                  <Clock size={20} />
                  <span>{recipe.time} min</span>
                </S.InfoItem>
                <S.InfoItem>
                  <ForkKnife size={20} />
                  <span>{recipe.difficulty}</span>
                </S.InfoItem>
              </S.InfoRow>

              {recipe.description && (
                <S.Section>
                  <S.SectionTitle>Descrição</S.SectionTitle>
                  <S.SectionContent>{recipe.description}</S.SectionContent>
                </S.Section>
              )}

              {recipe.instructions && (
                <S.Section>
                  <S.SectionTitle>Instruções</S.SectionTitle>
                  <S.SectionContent>{recipe.instructions}</S.SectionContent>
                </S.Section>
              )}
            </S.Content>
          </>
        ) : (
          <S.ContentFull>
            <S.ImagePlaceholder>
              <S.MealBadge>{recipe.meal}</S.MealBadge>
              <S.PlaceholderTitle>{recipe.recipeName}</S.PlaceholderTitle>
            </S.ImagePlaceholder>

            <S.ContentInner>
              <S.Title>{recipe.recipeName}</S.Title>

              <S.InfoRow>
                <S.InfoItem>
                  <Clock size={20} />
                  <span>{recipe.time} min</span>
                </S.InfoItem>
                <S.InfoItem>
                  <ForkKnife size={20} />
                  <span>{recipe.difficulty}</span>
                </S.InfoItem>
              </S.InfoRow>

              {recipe.description && (
                <S.Section>
                  <S.SectionTitle>Descrição</S.SectionTitle>
                  <S.SectionContent>{recipe.description}</S.SectionContent>
                </S.Section>
              )}

              {recipe.instructions && (
                <S.Section>
                  <S.SectionTitle>Instruções</S.SectionTitle>
                  <S.SectionContent>{recipe.instructions}</S.SectionContent>
                </S.Section>
              )}
            </S.ContentInner>
          </S.ContentFull>
        )}
      </S.ModalContainer>
    </S.Overlay>
  );
}
