import { useTheme } from "styled-components";
import CardInfo from "../../components/CardInfo";
import * as S from "./styles";
import { FaNode, FaReact } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
export default function About() {
  const theme = useTheme();
  return (
    <S.Container>
      <S.DivText>
        <S.Title>Sobre Delishare</S.Title>
      </S.DivText>

      <S.DivInfo>
        <S.Info>
          <S.TitleInfo>Como Começou?</S.TitleInfo>
          <S.Description>
            A ideia de criar o Delishare surgiu como parte do meu processo de
            evolução como desenvolvedor. Mais do que um simples projeto, ele é
            uma oportunidade prática de aplicar e aprimorar meus conhecimentos
            em tecnologias modernas como React e TypeScript.
            <br /> O foco é desenvolver uma aplicação escalável, eficiente e com
            uma arquitetura sólida, explorando boas práticas de desenvolvimento
            e buscando sempre uma estrutura que possa crescer de forma
            organizada. O Delishare representa esse compromisso com o
            aprendizado contínuo, utilizando a tecnologia de forma inteligente
            para criar algo útil, funcional e com potencial de expansão.
          </S.Description>
        </S.Info>

        <S.DivImage />
      </S.DivInfo>

      <S.Tech>
        <S.TitleTech>Tecnologias</S.TitleTech>
        <S.DescriptionTech>
          As engrenagens por trás do que você vê funcionando aqui.
        </S.DescriptionTech>
        <CardInfo
          IconColor={theme.colors.blueSchema.dark}
          bgColor={theme.colors.blueSchema.light}
          icon={<FaReact />}
          name="React"
          description="Uma biblioteca JavaScript para construir interfaces de usuário modernas, reativas e componentizadas. Ideal para criar experiências interativas no frontend."
        />
        <CardInfo
          IconColor={theme.colors.blueSchema.dark}
          bgColor={theme.colors.blueSchema.light}
          icon={<SiTypescript />}
          name="TypeScript"
          description="Uma plataforma baseada em JavaScript amplamente utilizada no backend. Permite criar APIs rápidas, escaláveis e modernas, aproveitando o ecossistema robusto do JavaScript."
        />
        <CardInfo
          IconColor={theme.colors.blueSchema.dark}
          bgColor={theme.colors.blueSchema.light}
          icon={<FaNode />}
          name="Node"
          description="Uma linguagem de programação amplamente usada no backend. Com o framework Laravel, facilita a criação de APIs robustas e seguras com uma sintaxe limpa e expressiva."
        />
      </S.Tech>
    </S.Container>
  );
}
