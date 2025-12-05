import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${spin} 1s linear infinite;

  svg {
    display: block;
  }
`;

export const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    border-radius: 12px;
  }

  @media (max-width: 540px) {
    padding: 1rem;
    border-radius: 10px;
  }
`;

export const InfoTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.textBase};
  color: ${({ theme }) => theme.font.colors.DarkBlue};

  @media (max-width: 540px) {
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: ${({ theme }) => theme.font.size.textSm};
  }
`;

export const Photo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors.greenSchema?.default || theme.colors.primary};
    transform: scale(1.05);
  }

  @media (max-width: 540px) {
    width: 40px;
    height: 40px;
  }
`;

export const PhotoPlaceholder = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.muted || theme.colors.white3};
  border: 2px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors.greenSchema?.default || theme.colors.primary};
    background: ${({ theme }) =>
      theme.colors.greenSchema?.light || theme.colors.muted};
    transform: scale(1.05);
  }

  @media (max-width: 540px) {
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const BottomRow = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 540px) {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;

export const ImageButton = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.625rem 1rem;
  border-radius: 10px;
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  font-size: ${({ theme }) => theme.font.size.textSm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  background: ${({ theme }) => theme.colors.muted || theme.colors.white3};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    background: ${({ theme }) =>
      theme.colors.greenSchema?.light || theme.colors.muted};
    border-color: ${({ theme }) =>
      theme.colors.greenSchema?.default || theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    transition: all 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  @media (max-width: 540px) {
    padding: 0.5rem 0.75rem;
    font-size: ${({ theme }) => theme.font.size.textXs};
    gap: 0.375rem;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const ImagePreview = styled.div`
  margin-top: 1rem;
  position: relative;
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    max-width: 100%;

    img {
      max-height: 250px;
    }
  }

  @media (max-width: 540px) {
    margin-top: 0.75rem;

    img {
      max-height: 200px;
      border-radius: 10px;
    }
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.95);
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${({ theme }) => theme.colors.error || "#ef4444"};
    color: white;
    border-color: ${({ theme }) => theme.colors.error || "#ef4444"};
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95) rotate(90deg);
  }

  @media (max-width: 540px) {
    width: 28px;
    height: 28px;
    font-size: 14px;
    top: 6px;
    right: 6px;
  }
`;
