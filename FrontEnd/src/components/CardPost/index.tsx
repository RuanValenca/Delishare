import { User } from "lucide-react";
import { useTheme } from "styled-components";
import * as S from "./styles";
import { useEffect, useState } from "react";

interface Props {
  img: string | null;
  userName: string;
  pfp: string | null;
  textContent: string;
  createdAt: string;
}

export default function CardPost({
  img,
  textContent,
  pfp,
  userName,
  createdAt,
}: Props) {
  const theme = useTheme();
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof img === "string") {
      setSrc(img);
    } else {
      setSrc(null);
    }
  }, [img]);

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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
    </S.Container>
  );
}
