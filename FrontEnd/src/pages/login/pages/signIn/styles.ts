import styled from "styled-components";

export const Container = styled.div<{ isCreate: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 95vh;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1rem 2rem;
`;

export const Header = styled.header`
  padding: 1rem 0;
`;

export const IconDiv = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: ${({ theme }) => theme.colors.gradientBackground};
`;

export const H1 = styled.h1`
  background: ${({ theme }) => theme.font.colors.gradientText};
  background-clip: text;
  color: transparent;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const H2 = styled.h2`
  font-weight: ${({ theme }) => theme.font.weight.light};
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textSm};
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
`;

export const CreateForm = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
`;

export const BottomForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-bottom: 1rem;
`;

export const A = styled.a`
  cursor: pointer;
  font-weight: ${({ theme }) => theme.font.weight.light};
  color: ${({ theme }) => theme.font.colors.lightBlue};
  font-size: ${({ theme }) => theme.font.size.textSm};
`;

export const P = styled.p`
  font-size: ${({ theme }) => theme.font.size.textSm};
`;

export const Footer = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;

  gap: 1rem;
`;
