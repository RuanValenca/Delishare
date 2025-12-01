import { HeartStraight } from "phosphor-react";
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
  const [liked, setLiked] = useState(false);
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
          {pfp && (
            <S.Photo>
              <img src={pfp} alt="profile" />
            </S.Photo>
          )}
          <span>{userName}</span>
        </S.LeftHeader>

        <S.DateText>{formatDate(createdAt)}</S.DateText>
      </S.Header>

      {src && <S.ImagePost src={src} alt="post image" />}

      <S.TextContent>
        <S.Text>{textContent}</S.Text>

        <S.Actions onClick={() => setLiked(!liked)}>
          <HeartStraight
            cursor="pointer"
            size={25}
            weight={liked ? "fill" : "light"}
            color="red"
          />
        </S.Actions>
      </S.TextContent>
    </S.Container>
  );
}
