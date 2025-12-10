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
  font-weight: ${({ theme }) => theme.font.weight.normal};

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
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-size: ${({ theme }) => theme.font.size.textBase};
  color: #000;
  line-height: 1.6;
  margin: 0;
  word-wrap: break-word;

  @media (max-width: 540px) {
    font-size: ${({ theme }) => theme.font.size.textSm};
  }
`;

export const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  gap: 1rem;

  @media (max-width: 540px) {
    padding: 0.625rem 1.25rem;
  }
`;

export const CommentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textBase};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.font.colors.lightBlue};
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

export const CommentsSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.muted || "#F9FAFB"};

  @media (max-width: 540px) {
    padding: 0.875rem 1.25rem;
  }
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 3px;

    &:hover {
      background: ${({ theme }) => theme.font.colors.secondaryText};
    }
  }
`;

export const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CommentPhoto = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CommentPhotoPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.muted || theme.colors.white3};
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

export const CommentUserName = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  font-size: ${({ theme }) => theme.font.size.textSm};
  color: ${({ theme }) => theme.font.colors.DarkBlue};
`;

export const CommentDate = styled.span`
  font-size: ${({ theme }) => theme.font.size.textXs};
  color: ${({ theme }) => theme.font.colors.secondaryText};
  margin-left: auto;
  opacity: 0.7;
`;

export const CommentText = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-size: ${({ theme }) => theme.font.size.textSm};
  color: ${({ theme }) => theme.font.colors.mainText};
  line-height: 1.5;
  margin: 0;
  margin-top: 0.25rem;
`;

export const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CommentInput = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.font.size.textSm};
  color: ${({ theme }) => theme.font.colors.mainText};
  resize: none;
  min-height: 40px;
  max-height: 120px;
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.font.colors.secondaryText};
    opacity: 0.6;
  }
`;

export const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.blueSchema.default};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.blueSchema.dark};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MockMessage = styled.div`
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  font-size: ${({ theme }) => theme.font.size.textSm};
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-style: italic;
`;
