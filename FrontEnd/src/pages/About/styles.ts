import styled from "styled-components";
import bg from "../../assets/img/programming.jpg";

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  @media (max-width: 768px) {
    gap: 3rem;
  }

  @media (max-width: 540px) {
    gap: 2rem;
  }
`;

export const DivInfo = styled.div`
  padding: 0rem 4rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: 40% 60%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0rem 2rem;
    gap: 2rem;
  }

  @media (max-width: 540px) {
    padding: 0rem 1rem;
    gap: 1.5rem;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DivText = styled.div`
  padding-top: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  background: ${({ theme }) => theme.font.colors.gradientText};
  background-clip: text;
  color: transparent;
  font-size: ${({ theme }) => theme.font.size.text4Xl};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.text3Xl};
  }

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.text2Xl};
  }
`;

export const TitleInfo = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  font-size: ${({ theme }) => theme.font.size.text2Xl};
`;

export const Description = styled.p`
  width: 100%;
  height: fit-content;
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textLg};
  font-weight: ${({ theme }) => theme.font.weight.light};

  @media (max-width: 768px) {
    text-align: justify;
  }
`;

export const DivImage = styled.div`
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
  height: 110%;
  width: 100%;
  min-height: 300px;

  background-image: url(${bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    height: 400px;
    order: -1;
  }

  @media (max-width: 540px) {
    height: 250px;
    min-height: 250px;
  }
`;

export const Tech = styled.div`
  padding: 0 2rem 4rem;
  width: 100%;
  min-height: 90vh;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 1rem 2rem;
    gap: 1.5rem;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    padding: 0 1rem 2rem;
    gap: 1.5rem;
  }
`;

export const TitleTech = styled.h2`
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  font-size: ${({ theme }) => theme.font.size.text3Xl};
  grid-column: span 3;

  @media (max-width: 768px) {
    grid-column: span 2;
    font-size: ${({ theme }) => theme.font.size.text2Xl};
  }

  @media (max-width: 540px) {
    grid-column: span 1;
    font-size: ${({ theme }) => theme.font.size.textXl};
  }
`;

export const DescriptionTech = styled.h2`
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textSm};
  grid-column: span 3;

  @media (max-width: 768px) {
    grid-column: span 2;
  }

  @media (max-width: 540px) {
    grid-column: span 1;
  }
`;
