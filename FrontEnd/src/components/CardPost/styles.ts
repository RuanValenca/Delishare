import styled from "styled-components";

export const Container = styled.div`
  width: 65%;
  border-radius: 0.75rem;
  box-shadow: 0 0.125rem 0.3125rem ${({ theme }) => theme.colors.shadow};
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
`;

export const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const DateText = styled.span`
  font-size: 0.875rem;
  opacity: 0.7;
`;

export const Photo = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ImagePost = styled.img`
  width: 100%;
  height: auto;
  max-height: 20rem;
  object-fit: cover;
  object-position: center;
  display: block;
`;

export const TextContent = styled.div`
  padding: 1rem 1.5rem;
  font-weight: ${({ theme }) => theme.font.weight.light};
  color: ${({ theme }) => theme.font.colors.secondaryText};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const Text = styled.h4``;
