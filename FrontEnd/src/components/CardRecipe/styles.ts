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
`;

export const Background = styled.div<{ img?: string }>`
  height: 70%;
  background-image: ${({ img }) => (img ? `url(${img})` : "none")};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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

export const Img = styled.img`
  border-radius: 12px 12px 0 0;
  width: 100%;
  height: 100%;
`;

export const DescriptionBar = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  padding: 0.5rem 1rem;
  height: 30%;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.background};
`;

export const Name = styled.h3`
  grid-column: span 2;
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
`;

const InfoText = styled.p`
  position: absolute;
  bottom: 0;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-size: ${({ theme }) => theme.font.size.textSm};
`;

export const Time = styled(InfoText)``;
export const Difficulty = styled(InfoText)`
  justify-self: end;
`;
