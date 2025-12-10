import { useCallback, useEffect, useState } from "react";
import type { ShowResult } from "../../api/Feed/types/feed.interface";
import CardPost from "../../components/CardPost";
import FeedCreate from "../../components/CreateFeed";
import * as S from "./styles";
import { handleGetList } from "../../api/Feed/feed.service";

export default function Feed() {
  const [list, setList] = useState<ShowResult[]>([]);

  const handleShow = useCallback(() => {
    handleGetList().then((res) => {
      setList(res.data);
    });
  }, []);

  useEffect(() => {
    handleShow();
  }, [handleShow]);

  return (
    <S.Container>
      <FeedCreate setList={setList} />
      {list.length > 0 ? (
        list.map((item, index) => (
          <CardPost
            key={index}
            img={item.imageUrl}
            pfp={item.pfp}
            createdAt={item.createdAt}
            userName={item.userName}
            textContent={item.description}
          />
        ))
      ) : (
        <S.EmptyState>
          <S.EmptyMessage>
            Nenhum post encontrado. Seja o primeiro a compartilhar algo!
          </S.EmptyMessage>
        </S.EmptyState>
      )}
    </S.Container>
  );
}
