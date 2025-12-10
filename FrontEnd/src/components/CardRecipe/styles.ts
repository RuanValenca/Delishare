import styled from "styled-components";

export const Container = styled.div`
  cursor: pointer;
  box-shadow: 0px 2px 5px ${({ theme }) => theme.colors.shadow};
  height: 350px;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 10px 15px ${({ theme }) => theme.colors.shadow};
  }

  @media (max-width: 540px) {
    height: 300px;
  }
`;

export const Background = styled.div<{ img?: string }>`
  height: 70%;
  position: relative;
  background-image: ${({ img }) => (img ? `url(${img})` : "none")};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${({ img, theme }) =>
    img ? "transparent" : theme.colors.gradientBackgroundLight};
`;

export const Meal = styled.p`
  border-radius: 6px;
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${({ theme }) => theme.font.colors.whiteText};
  padding: 2px 10px;
  background: ${({ theme }) => theme.colors.greenSchema.default};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.textXs};
`;

export const Fallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.font.colors.whiteText};
  font-size: ${({ theme }) => theme.font.size.textLg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  /* backdrop-filter: brightness(0.9);
   */
  background: ${({ theme }) => theme.colors.greenSchema.default};
`;

export const Img = styled.img`
  border-radius: 12px 12px 0 0;
  width: 100%;
  height: 100%;
`;

export const DescriptionBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  height: 30%;
  background: ${({ theme }) => theme.colors.background};
  justify-content: space-between;

  @media (max-width: 540px) {
    padding: 0.625rem 0.875rem;
  }
`;

export const Name = styled.h3`
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.textBase};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-height: 2.8em;

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textSm};
    -webkit-line-clamp: 2;
    min-height: 2.6em;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.5rem;
  flex-shrink: 0;

  @media (max-width: 540px) {
    margin-top: 0.375rem;
    gap: 0.5rem;
  }
`;

const InfoText = styled.p`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-size: ${({ theme }) => theme.font.size.textSm};
  margin: 0;
  white-space: nowrap;

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textXs};
    gap: 0.25rem;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const Time = styled(InfoText)``;
export const Difficulty = styled(InfoText)``;

export const InfoWrapper = styled(InfoContainer)``;
