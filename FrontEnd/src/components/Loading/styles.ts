import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

export const LoadingWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
`;

export const SpinnerRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    ${({ theme }) => theme.colors.blueSchema?.default || "#0EA5E9"} 0deg,
    ${({ theme }) => theme.colors.greenSchema?.default || "#4ADE80"} 180deg,
    ${({ theme }) => theme.colors.blueSchema?.default || "#0EA5E9"} 360deg
  );
  padding: 4px;
  animation: ${spin} 1.5s linear infinite;

  &::after {
    content: "";
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.background || "#FEFCF9"};
  }
`;

export const IconWrapper = styled.div`
  position: relative;
  z-index: 1;
  animation: ${pulse} 2s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GradientIcon = styled.div`
  position: relative;

  svg {
    color: ${({ theme }) => theme.colors.blueSchema?.default || "#0EA5E9"};
    filter: drop-shadow(0 0 4px rgba(14, 165, 233, 0.4));
  }
`;
