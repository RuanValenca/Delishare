import styled from "styled-components";
import bg from "../../../../assets/img/FotoAlimento.jpg";

export const Container = styled.nav`
  background: ${({ theme }) => theme.colors.gradientBackground};
  color: ${({ theme }) => theme.font.colors.whiteText};
  padding: 3rem 6rem 3rem 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 80vh;
`;

export const DivText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Phrase = styled.h1`
  width: 95%;
  height: fit-content;
  font-size: ${({ theme }) => theme.font.size.text4Xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const Description = styled.p`
  width: 90%;
  height: fit-content;
  font-size: ${({ theme }) => theme.font.size.textXl};
  font-weight: ${({ theme }) => theme.font.weight.normal};
`;

export const DivImage = styled.div`
  position: relative;
  border-radius: 12px;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Img = styled.img`
  height: 100%;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  right: -20px;
  bottom: -20px;
  position: absolute;
  border-radius: 12px;
  width: fit-content;
  height: fit-content;
  background: ${({ theme }) => theme.colors.background};
`;

export const P = styled.p``;
