import styled from "styled-components";
import bg from "../../../../assets/img/FotoAlimento.jpg";

export const Container = styled.nav`
  background: ${({ theme }) => theme.colors.gradientBackground};
  color: ${({ theme }) => theme.font.colors.whiteText};
  padding: 3rem 6rem 3rem 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  min-height: 80vh;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem;
    min-height: auto;
    height: auto;
  }

  @media (max-width: 540px) {
    padding: 2rem 1.5rem;
    background: transparent;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url(${bg});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.3;
      z-index: 0;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 0;
    }

    & > * {
      position: relative;
      z-index: 1;
    }
  }
`;

export const DivText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 968px) {
    align-items: center;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    @media (max-width: 968px) {
      max-width: 100%;
    }
  }
`;

export const Phrase = styled.h1`
  width: 95%;
  height: fit-content;
  font-size: ${({ theme }) => theme.font.size.text4Xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};

  @media (max-width: 768px) {
    width: 100%;
    font-size: ${({ theme }) => theme.font.size.text3Xl};
    text-align: center;
  }

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.text2Xl};
  }
`;

export const Description = styled.p`
  width: 90%;
  height: fit-content;
  font-size: ${({ theme }) => theme.font.size.textXl};
  font-weight: ${({ theme }) => theme.font.weight.normal};

  @media (max-width: 768px) {
    width: 100%;
    font-size: ${({ theme }) => theme.font.size.textBase};
    text-align: center;
  }

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textSm};
  }
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
  min-height: 300px;

  @media (max-width: 768px) {
    min-height: 250px;
    order: -1;
  }

  @media (max-width: 540px) {
    display: none;
  }
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

  @media (max-width: 540px) {
    display: none;
  }
`;

export const P = styled.p``;
