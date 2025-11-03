import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  box-shadow: 0px 2px 5px ${({ theme }) => theme.colors.shadow};
  max-height: 500px;
  max-width: 450px;
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ImagePost = styled.img`
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const TextContent = styled.div`
  padding: 0.5rem 1.5rem;
  height: 100px;
  font-weight: ${({ theme }) => theme.font.weight.light};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.font.colors.secondaryText};
`;

export const Actions = styled.div`
  position: absolute;
  display: flex;
  gap: 1rem;
  bottom: 1rem;
  left: 1.5rem;
  height: fit-content;
  width: fit-content;
`;

export const Text = styled.h4``;
