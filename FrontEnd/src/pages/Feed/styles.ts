import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 1.5rem;
    max-width: 100%;
  }

  @media (max-width: 540px) {
    padding: 1rem 0.75rem;
    gap: 1.25rem;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 3rem 2rem;
  text-align: center;
  width: 100%;
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
