import { HeartStraight } from "phosphor-react";
import * as S from "./styles";
import { useState } from "react";

interface Props {
  img?: string;
  textContent: string;
}

export default function CardPost({ img, textContent }: Props) {
  const [liked, setLiked] = useState(false);
  return (
    <S.Container>
      <S.ImagePost src={img} />
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
