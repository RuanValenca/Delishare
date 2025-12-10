import { MessageCircle, Send, User } from "lucide-react";
import { useTheme } from "styled-components";
import * as S from "./styles";
import { useEffect, useState, useRef } from "react";
import type { Comment } from "../../api/Feed/types/feed.interface";
import { useDelishare } from "../../hooks/useProvider";
import { handleCreateComment } from "../../api/Feed/feed.service";

interface Props {
  img: string | null;
  userName: string;
  pfp: string | null;
  textContent: string;
  createdAt: string;
  postId: number;
  comments?: Comment[];
  onCommentAdd?: (postId: number, comment: Comment) => void;
  isMocked?: boolean;
}

export default function CardPost({
  img,
  textContent,
  pfp,
  userName,
  createdAt,
  postId,
  comments = [],
  onCommentAdd,
  isMocked = false,
}: Props) {
  const theme = useTheme();
  const { userInfo } = useDelishare();
  const [src, setSrc] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prevCommentsRef = useRef<string>("");

  useEffect(() => {
    if (typeof img === "string") {
      setSrc(img);
    } else {
      setSrc(null);
    }
  }, [img]);

  useEffect(() => {
    // Compara os IDs dos comentários para evitar loops infinitos
    const newIds = comments
      .map((c) => c.id)
      .sort()
      .join(",");

    if (prevCommentsRef.current !== newIds) {
      prevCommentsRef.current = newIds;
      setLocalComments(comments);
    }
  }, [comments]);

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleAddComment = async () => {
    if (!commentText.trim() || !userInfo || isSubmitting) return;

    setIsSubmitting(true);
    const textToSend = commentText.trim();
    setCommentText("");

    try {
      const response = await handleCreateComment({
        postId,
        userId: userInfo.id,
        text: textToSend,
        createdAt: new Date().toISOString(),
      });

      if (response.result && response.data) {
        const newComment: Comment = response.data;
        const updatedComments = [...localComments, newComment];
        setLocalComments(updatedComments);

        if (onCommentAdd) {
          onCommentAdd(postId, newComment);
        }
      }
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      setCommentText(textToSend); // Restaura o texto em caso de erro
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.LeftHeader>
          {pfp ? (
            <S.Photo>
              <img src={pfp} alt="profile" />
            </S.Photo>
          ) : (
            <S.PhotoPlaceholder>
              <User size={24} color={theme.font.colors.DarkBlue} />
            </S.PhotoPlaceholder>
          )}
          <S.UserName>{userName}</S.UserName>
        </S.LeftHeader>

        <S.DateText>{formatDate(createdAt)}</S.DateText>
      </S.Header>

      {src && <S.ImagePost src={src} alt="post image" />}

      <S.TextContent>
        <S.Text>{textContent}</S.Text>
      </S.TextContent>

      <S.ActionsBar>
        <S.CommentButton onClick={() => setShowComments(!showComments)}>
          <MessageCircle size={20} />
          <span>{localComments.length}</span>
        </S.CommentButton>
      </S.ActionsBar>

      {showComments && (
        <S.CommentsSection>
          {localComments.length > 0 && (
            <S.CommentsList>
              {localComments.map((comment) => (
                <S.CommentItem key={comment.id}>
                  <S.CommentHeader>
                    {comment.pfp ? (
                      <S.CommentPhoto>
                        <img src={comment.pfp} alt="profile" />
                      </S.CommentPhoto>
                    ) : (
                      <S.CommentPhotoPlaceholder>
                        <User size={16} color={theme.font.colors.DarkBlue} />
                      </S.CommentPhotoPlaceholder>
                    )}
                    <S.CommentUserName>{comment.userName}</S.CommentUserName>
                    <S.CommentDate>
                      {formatDate(comment.createdAt)}
                    </S.CommentDate>
                  </S.CommentHeader>
                  <S.CommentText>{comment.text}</S.CommentText>
                </S.CommentItem>
              ))}
            </S.CommentsList>
          )}

          {userInfo && !isMocked && (
            <S.CommentInputContainer>
              <S.CommentInput
                placeholder="Adicione um comentário..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddComment();
                  }
                }}
              />
              <S.SendButton
                onClick={handleAddComment}
                disabled={!commentText.trim() || isSubmitting}
              >
                <Send size={18} />
              </S.SendButton>
            </S.CommentInputContainer>
          )}
          {isMocked && (
            <S.MockMessage>
              Comentários desabilitados para posts de exemplo
            </S.MockMessage>
          )}
        </S.CommentsSection>
      )}
    </S.Container>
  );
}
