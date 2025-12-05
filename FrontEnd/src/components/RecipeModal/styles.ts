import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow: hidden;
  backdrop-filter: blur(4px);

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 540px) {
    padding: 0;
  }
`;

export const ModalContainer = styled.div<{ hasImage: boolean }>`
  position: relative;
  width: 90%;
  max-width: ${({ hasImage }) => (hasImage ? "1000px" : "700px")};
  height: 95vh;
  max-height: 95vh;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: ${({ hasImage }) => (hasImage ? "row" : "column")};
  box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.4);
  animation: slideIn 0.3s ease-out;

  @media (max-width: 768px) {
    max-width: 95%;
    height: 90vh;
    flex-direction: column;
  }

  @media (max-width: 540px) {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    top: 0.75rem;
    right: 0.75rem;
  }

  @media (max-width: 540px) {
    width: 36px;
    height: 36px;
    top: 0.5rem;
    right: 0.5rem;
  }
`;

export const ImageContainer = styled.div<{ img?: string }>`
  width: 40%;
  height: 100%;
  position: relative;
  flex-shrink: 0;
  background-image: ${({ img }) => (img ? `url(${img})` : "none")};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3));
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
    min-height: 250px;
  }

  @media (max-width: 540px) {
    height: 200px;
    min-height: 200px;
  }
`;

export const MealBadge = styled.p`
  position: absolute;
  top: 1rem;
  left: 1rem;
  border-radius: 8px;
  color: ${({ theme }) => theme.font.colors.whiteText};
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.greenSchema.default};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.textSm};
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    top: 0.75rem;
    left: 0.75rem;
    padding: 6px 12px;
    font-size: ${({ theme }) => theme.font.size.textXs};
  }

  @media (max-width: 540px) {
    top: 0.5rem;
    left: 0.5rem;
    padding: 5px 10px;
    font-size: ${({ theme }) => theme.font.size.textXs};
  }
`;

export const Content = styled.div`
  position: relative;
  width: 60%;
  height: 100%;
  padding: 2.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.greenSchema.default};
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem;
    gap: 1.25rem;
  }

  @media (max-width: 540px) {
    padding: 1.5rem;
    gap: 1rem;
  }
`;

export const ContentFull = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  background: ${({ theme }) => theme.colors.gradientBackgroundLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;

  @media (max-width: 540px) {
    height: 150px;
    padding: 1.5rem;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.greenSchema.default} 0%,
      ${({ theme }) =>
          theme.colors.blueSchema?.default || theme.colors.greenSchema.default}
        100%
    );
    opacity: 0.1;
  }
`;

export const PlaceholderTitle = styled.h2`
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  font-size: ${({ theme }) => theme.font.size.text2Xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  text-align: center;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.textXl};
    margin-top: 0.75rem;
  }

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textLg};
    margin-top: 0.5rem;
  }
`;

export const ContentInner = styled.div`
  flex: 1;
  padding: 2.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 2rem;
    gap: 1.25rem;
  }

  @media (max-width: 540px) {
    padding: 1.5rem;
    gap: 1rem;
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.greenSchema.default};
    }
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.text2Xl};
  margin: 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.textXl};
  }

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textLg};
  }
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1.5rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 540px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-size: ${({ theme }) => theme.font.size.textBase};

  svg {
    color: ${({ theme }) => theme.colors.greenSchema.default};
    flex-shrink: 0;
  }

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textSm};

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  font-size: ${({ theme }) => theme.font.size.textLg};
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.textBase};
  }

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textSm};
  }
`;

export const SectionContent = styled.p`
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-size: ${({ theme }) => theme.font.size.textBase};
  line-height: 1.7;
  white-space: pre-wrap;
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.textSm};
    line-height: 1.6;
  }

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textXs};
    line-height: 1.5;
  }
`;
