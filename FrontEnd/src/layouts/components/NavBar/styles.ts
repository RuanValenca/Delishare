import styled from "styled-components";
import { keyframes } from "styled-components";
import { Settings } from "lucide-react";
export const Container = styled.nav`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.font.colors.lightBlue};
  box-shadow: 0px 3px 5px ${({ theme }) => theme.colors.shadow};
  align-items: center;
  padding: 1rem 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-x: auto;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 0.75rem;
    justify-content: center;
  }

  @media (max-width: 320px) {
    padding: 0.5rem;
  }
`;

export const Name = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
  line-height: 1;
`;

export const DivName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const DivLink = styled.div`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
    flex-wrap: nowrap;
    justify-content: center;
  }

  @media (max-width: 320px) {
    gap: 0.25rem;
    flex-wrap: nowrap;
  }
`;

export const P = styled.p`
  cursor: pointer;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.font.size.textBase};

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textSm};
  }
`;

export const LinkItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 8px;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
  }

  @media (max-width: 320px) {
    padding: 0.25rem;
    gap: 0.25rem;
  }
`;

export const LinkText = styled.span`
  white-space: nowrap;
  font-size: ${({ theme }) => theme.font.size.textBase};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LinkIcon = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  transition: all 0.2s ease;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: flex;
  }

  ${LinkItem}:hover & {
    color: ${({ theme }) => theme.colors.greenSchema.default};
    transform: scale(1.1);
  }
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); } 

`;

export const SettingIcon = styled(Settings)`
  width: 55px;
  cursor: pointer;
  padding: 0 0.5rem;
  transition: all 0.3s ease-in-out;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 40px;
    padding: 0 0.25rem;
  }

  @media (max-width: 320px) {
    width: 32px;
    padding: 0 0.125rem;
  }
`;

export const ProfileImage = styled.div<{ src?: string | null }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
  border: 2px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};

  ${({ src }) =>
    src
      ? `
    background-image: url(${src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `
      : ""}

  &:hover {
    border-color: ${({ theme }) => theme.colors.greenSchema.default};
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 320px) {
    width: 28px;
    height: 28px;
  }
`;
