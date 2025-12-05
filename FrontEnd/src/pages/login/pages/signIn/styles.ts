import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const containerFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

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
  min-height: ${({ isCreate }) => (isCreate ? "95vh" : "auto")};
  height: ${({ isCreate }) => (isCreate ? "95vh" : "auto")};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 1rem 2rem;
  transition:
    height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    min-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${containerFadeIn} 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  will-change: height, min-height;

  @media (max-width: 768px) {
    width: 90vw;
    height: auto;
    min-height: auto;
  }
`;

export const Header = styled.header`
  padding: 1rem 0;
  animation: ${fadeIn} 0.5s ease;
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
  animation: ${scaleIn} 0.5s ease;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(5deg);
  }
`;

export const H1 = styled.h1`
  background: ${({ theme }) => theme.font.colors.gradientText};
  background-clip: text;
  color: transparent;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  animation: ${slideIn} 0.6s ease;
`;

export const H2 = styled.h2`
  font-weight: ${({ theme }) => theme.font.weight.normal};
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textSm};
  animation: ${slideIn} 0.7s ease;
  transition: all 0.3s ease;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  animation: ${fadeIn} 0.5s ease;
`;

export const CreateForm = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(2, 1fr);
  animation: ${slideIn} 0.5s ease;
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BottomForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-bottom: 1rem;
`;

export const A = styled.a`
  cursor: pointer;
  font-weight: ${({ theme }) => theme.font.weight.normal};
  color: ${({ theme }) => theme.font.colors.lightBlue};
  font-size: ${({ theme }) => theme.font.size.textSm};
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;

  &:hover {
    color: ${({ theme }) =>
      theme.colors.blueSchema?.default || theme.colors.primary};
    transform: translateY(-2px);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) =>
      theme.colors.blueSchema?.default || theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const P = styled.p`
  font-size: ${({ theme }) => theme.font.size.textSm};
  animation: ${fadeIn} 0.5s ease;
`;

export const Footer = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${fadeIn} 0.6s ease;
`;
