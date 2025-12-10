import { useCallback, useEffect, useState } from "react";
import type { ShowResult, Comment } from "../../api/Feed/types/feed.interface";
import CardPost from "../../components/CardPost";
import FeedCreate from "../../components/CreateFeed";
import * as S from "./styles";
import { handleGetList } from "../../api/Feed/feed.service";

export default function Feed() {
  const [list, setList] = useState<ShowResult[]>([]);

  const handleShow = useCallback(() => {
    handleGetList().then((res) => {
      // Se não houver dados, adiciona posts mockados
      if (res.data.length === 0) {
        const mockPosts = [
          {
            id: 1,
            userId: 1,
            userName: "Chef Ana",
            description:
              "Acabei de preparar essa salada mediterrânea deliciosa! Perfeita para um jantar leve e saudável. O queijo feta combina perfeitamente com os vegetais frescos.",
            imageUrl: "/salad.jpg",
            createdAt: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            pfp: null,
            isMocked: true,
          },
          {
            id: 2,
            userId: 2,
            userName: "Chef João",
            description:
              "Macarrão ao molho pesto cremoso é sempre uma boa escolha! Esse prato italiano clássico ficou incrível com o toque cremoso.",
            imageUrl: "/creamyPesto.jpg",
            createdAt: new Date(
              Date.now() - 1 * 24 * 60 * 60 * 1000
            ).toISOString(),
            pfp: null,
            isMocked: true,
          },
          {
            id: 3,
            userId: 3,
            userName: "Chef Maria",
            description:
              "Torrada de abacate com ovos pochê é meu café da manhã favorito! Nutritivo, saboroso e cheio de energia para começar o dia.",
            imageUrl: "/avocadoToast.jpg",
            createdAt: new Date().toISOString(),
            pfp: null,
            isMocked: true,
          },
        ];
        setList(mockPosts);
      } else {
        setList(res.data);
      }
    });
  }, []);

  useEffect(() => {
    handleShow();
  }, [handleShow]);

  const handleCommentAdd = (postId: number, comment: Comment) => {
    setList((prevList) =>
      prevList.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), comment],
          };
        }
        return post;
      })
    );
  };

  return (
    <S.Container>
      <FeedCreate setList={setList} />
      {list.length > 0 ? (
        list.map((item, index) => (
          <CardPost
            key={item.id || index}
            img={item.imageUrl}
            pfp={item.pfp}
            createdAt={item.createdAt}
            userName={item.userName}
            textContent={item.description}
            postId={item.id}
            comments={item.comments}
            onCommentAdd={handleCommentAdd}
            isMocked={item.isMocked || false}
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
