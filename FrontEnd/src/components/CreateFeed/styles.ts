import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const InfoTop = styled.div`
  width: 15%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  font-weight: bold;

  > :nth-child(1) {
    grid-column: 1;
  }
  > :nth-child(2) {
    grid-column: 2;
  }
`;

export const Photo = styled.img`
  margin-top: 10px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

export const BottomRow = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ImageButton = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  color: ${({ theme }) => theme.font.colors.mainText};
  font-size: 14px;

  &:hover {
    opacity: 0.85;
  }
`;

export const ImagePreview = styled.div`
  margin-top: 14px;
  position: relative;
  margin-top: 10px;
  img {
    width: 10%;
    max-height: 150px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;
