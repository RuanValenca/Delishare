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
