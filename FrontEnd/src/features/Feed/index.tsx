import CardPost from "../../components/CardPost";
import * as S from "./styles";

export default function Feed() {
  const posts = [
    {
      textContent: "Sobremesa gostosa com a family",
      img: "public/creamyPesto.jpg",
    },
  ];

  return (
    <S.Container>
      {posts.map((post, index) => (
        <CardPost key={index} img={post.img} textContent={post.textContent} />
      ))}
    </S.Container>
  );
}
