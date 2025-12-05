import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    border-radius: 12px;
  }

  @media (max-width: 540px) {
    border-radius: 10px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 540px) {
    padding: 0.875rem 1rem;
  }
`;

export const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`;

export const DateText = styled.span`
  font-size: ${({ theme }) => theme.font.size.textSm};
  color: ${({ theme }) => theme.font.colors.secondaryText};
  opacity: 0.8;
  font-weight: ${({ theme }) => theme.font.weight.regular};

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textXs};
  }
`;

export const Photo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors.greenSchema?.default || theme.colors.primary};
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 540px) {
    width: 40px;
    height: 40px;
  }
`;

export const UserName = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.textBase};
  color: ${({ theme }) => theme.font.colors.DarkBlue};

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textSm};
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
  flex-shrink: 0;
  transition: all 0.3s ease;

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

export const ImagePost = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.3s ease;

  ${Container}:hover & {
    transform: scale(1.01);
  }

  @media (max-width: 768px) {
    max-height: 400px;
  }

  @media (max-width: 540px) {
    max-height: 300px;
  }
`;

export const TextContent = styled.div`
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 540px) {
    padding: 1rem 1.25rem;
    gap: 0.75rem;
  }
`;

export const Text = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.regular};
  font-size: ${({ theme }) => theme.font.size.textBase};
  color: #000;
  line-height: 1.6;
  margin: 0;
  word-wrap: break-word;

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textSm};
  }
`;
