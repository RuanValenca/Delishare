import styled from "styled-components";
import { Heart } from "lucide-react";

export const Container = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  padding: 4rem 2rem 2rem;
  margin-top: auto;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
`;

export const TopSection = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (max-width: 540px) {
    gap: 2rem;
    margin-bottom: 1.5rem;
  }
`;

export const BrandSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const BrandName = styled.h2`
  color: ${({ theme }) => theme.font.colors.lightBlue};
  font-size: ${({ theme }) => theme.font.size.text2Xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0;
`;

export const BrandDescription = styled.p`
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textBase};
  line-height: 1.6;
  margin: 0;
  max-width: 90%;
`;

export const TechBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const Badge = styled.span`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.font.colors.whiteText};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.font.size.textXs};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
`;

export const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ColumnTitle = styled.h3`
  color: ${({ theme }) => theme.font.colors.lightBlue};
  font-size: ${({ theme }) => theme.font.size.textLg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.greenSchema.default};
  width: fit-content;
`;

export const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const LinkItem = styled.li`
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textBase};
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.greenSchema.default};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.font.colors.lightBlue};
    transform: translateX(4px);

    &::before {
      width: 100%;
    }
  }
`;

export const InfoItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textBase};
  margin: 0;

  svg {
    color: ${({ theme }) => theme.colors.greenSchema.default};
    flex-shrink: 0;
  }
`;

export const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.font.colors.secondaryText};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    color: ${({ theme }) => theme.font.colors.lightBlue};
    transform: translateX(4px);

    svg {
      color: ${({ theme }) => theme.colors.greenSchema.default};
    }
  }
`;

export const Divider = styled.hr`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }

  @media (max-width: 540px) {
    padding-top: 1rem;
    gap: 0.5rem;
  }
`;

export const Copyright = styled.p`
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textSm};
  margin: 0;
`;

export const Credits = styled.p`
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textSm};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HeartIcon = styled(Heart)`
  color: ${({ theme }) => theme.colors.greenSchema.default};
  fill: ${({ theme }) => theme.colors.greenSchema.default};
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

export const AuthorName = styled.span`
  color: ${({ theme }) => theme.font.colors.lightBlue};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
`;
