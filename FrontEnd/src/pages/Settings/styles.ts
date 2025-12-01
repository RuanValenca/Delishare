import styled from "styled-components";

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 10rem;
  background: ${({ theme }) => theme.colors.white3};
`;

export const DivTop = styled.div`
  padding: 1.5rem 0rem;
  height: 8rem;
  display: flex;
  justify-content: start;
  align-content: end;
  gap: 1rem;
`;

export const ButtonBack = styled.div`
  display: flex;
  align-items: center;
`;

export const DivText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  background: ${({ theme }) => theme.font.colors.gradientText};
  background-clip: text;
  color: transparent;
  font-size: ${({ theme }) => theme.font.size.text4Xl};
`;

export const Description = styled.p`
  width: 100%;
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textLg};
  font-weight: ${({ theme }) => theme.font.weight.light};
`;

export const DivInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  gap: 2rem;
`;

export const TitleInfo = styled.h1`
  color: ${({ theme }) => theme.font.colors.mainText};
  font-size: ${({ theme }) => theme.font.size.text2Xl};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DivImage = styled.div`
  margin: auto;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Img = styled.img`
  cursor: pointer;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  box-shadow: 0px 6px 15px ${({ theme }) => theme.colors.shadow};
  transition: filter 0.1s ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Icon = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0.3rem;
  right: -20px;
  bottom: 0;
  position: absolute;
  width: fit-content;
  height: fit-content;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};

  &:hover {
    background: ${({ theme }) => theme.colors.greenSchema.light};
  }
`;

export const Form = styled.div``;
