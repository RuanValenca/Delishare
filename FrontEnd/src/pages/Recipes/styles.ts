import styled from "styled-components";

export const Container = styled.nav`
  padding: 3rem 6rem 3rem 4rem;
  display: grid;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media (max-width: 540px) {
    padding: 1.5rem 1rem;
  }
`;

export const DivTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  background: ${({ theme }) => theme.font.colors.gradientText};
  background-clip: text;
  color: transparent;
  font-size: ${({ theme }) => theme.font.size.text4Xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.text3Xl};
  }

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.text2Xl};
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textBase};
  font-weight: ${({ theme }) => theme.font.weight.normal};
`;

export const CreateFormContainer = styled.form`
  padding: 2.5rem;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 1.5rem;
  align-items: stretch;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  & > :first-child {
    grid-column: 1 / -1;
    margin-bottom: 0.5rem;
  }

  /* Linha 1: meal, recipeName, time */
  & > :nth-child(2) {
    grid-column: 1;
  }

  & > :nth-child(3) {
    grid-column: 2;
  }

  & > :nth-child(4) {
    grid-column: 3;
  }

  /* Linha 2: difficulty, description */
  & > :nth-child(5) {
    grid-column: 1;
  }

  & > :nth-child(6) {
    grid-column: 2 / -1;
  }

  /* Linha 3: ImageUploadContainer, botão */
  & > :nth-child(7) {
    grid-column: 1 / 3;
  }

  & > :last-child {
    grid-column: 3;
    justify-self: end;
    align-self: start;
    min-width: 200px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 2rem;
    gap: 1.25rem;

    & > :nth-child(2),
    & > :nth-child(3),
    & > :nth-child(4) {
      grid-column: span 1;
    }

    & > :nth-child(4) {
      grid-column: 1 / -1;
    }

    & > :nth-child(6) {
      grid-column: 1 / -1;
    }

    & > :nth-child(7) {
      grid-column: 1 / -1;
    }

    & > :last-child {
      grid-column: 1 / -1;
      justify-self: stretch;
      min-width: auto;
    }
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1rem;

    & > * {
      grid-column: 1 / -1 !important;
    }
  }
`;

export const FormTitle = styled.h2`
  color: ${({ theme }) => theme.font.colors.mainText};
  font-size: ${({ theme }) => theme.font.size.text2Xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin-bottom: 0.5rem;
  background: ${({ theme }) => theme.font.colors.gradientText};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 540px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const ReverseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.font.colors.secondaryText};
  cursor: pointer;
  transition: all 0.2s ease;
  height: fit-content;
  font-size: ${({ theme }) => theme.font.size.textSm};
  font-weight: ${({ theme }) => theme.font.weight.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.muted || theme.colors.white3};
    border-color: ${({ theme }) =>
      theme.colors.blueSchema?.default || theme.colors.primary};
    color: ${({ theme }) => theme.font.colors.DarkBlue};
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    transition: all 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  @media (max-width: 540px) {
    padding: 0.5rem 0.75rem;
  }
`;

export const Buttons = styled.div`
  border-radius: 12px;
  overflow: hidden;
  width: fit-content;
  height: fit-content;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  @media (max-width: 540px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const Results = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ImageUploadContainer = styled.div`
  grid-column: 1 / 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ImageButton = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 8px;
  color: ${({ theme }) => theme.font.colors.mainText};
  font-size: ${({ theme }) => theme.font.size.textSm};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
    border-color: ${({ theme }) => theme.colors.blueSchema.default};
  }
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
    display: block;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 3rem 2rem;
  margin-top: 2rem;
  text-align: center;
`;

export const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textLg};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  margin: 0;
  line-height: 1.6;

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textBase};
  }
`;
