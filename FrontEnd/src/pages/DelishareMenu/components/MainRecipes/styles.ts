import styled from "styled-components";

export const Container = styled.nav`
  background: ${({ theme }) => theme.colors.background};
  padding: 3rem 4rem 3rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const DivText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
`;

export const Title = styled.h1`
  background: ${({ theme }) => theme.font.colors.gradientText};
  color: transparent;
  background-clip: text;
  font-size: ${({ theme }) => theme.font.size.text4Xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const Description = styled.p`
  width: 100%;
  height: fit-content;
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textXl};
  font-weight: ${({ theme }) => theme.font.weight.normal};
`;

export const DivCard = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
`;

export const Link = styled.p`
  cursor: pointer;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  color: ${({ theme }) => theme.font.colors.lightBlue};
  font-size: ${({ theme }) => theme.font.size.textBase};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;
