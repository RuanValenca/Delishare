import { ChefHat, Code, Github, Mail } from "lucide-react";
import * as S from "./styles";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <S.Container>
      <S.TopSection>
        <S.BrandSection>
          <S.Brand>
            <ChefHat size={40} color={theme.colors.greenSchema.default} />
            <S.BrandName>Delishare</S.BrandName>
          </S.Brand>
          <S.BrandDescription>
            Plataforma colaborativa para descobrir, compartilhar e se inspirar
            com receitas incríveis. Conecte-se com uma comunidade apaixonada por
            culinária.
          </S.BrandDescription>
          <S.TechBadges>
            <S.Badge>React</S.Badge>
            <S.Badge>TypeScript</S.Badge>
            <S.Badge>Node.js</S.Badge>
            <S.Badge>MySQL</S.Badge>
          </S.TechBadges>
        </S.BrandSection>

        <S.LinksGrid>
          <S.LinkColumn>
            <S.ColumnTitle>Navegação</S.ColumnTitle>
            <S.LinkList>
              <S.LinkItem onClick={() => handleNavigation("/Delishare")}>
                Início
              </S.LinkItem>
              <S.LinkItem onClick={() => handleNavigation("/recipes")}>
                Receitas
              </S.LinkItem>
              <S.LinkItem onClick={() => handleNavigation("/feed")}>
                Feed
              </S.LinkItem>
              <S.LinkItem onClick={() => handleNavigation("/about")}>
                Sobre
              </S.LinkItem>
            </S.LinkList>
          </S.LinkColumn>

          <S.LinkColumn>
            <S.ColumnTitle>Projeto</S.ColumnTitle>
            <S.LinkList>
              <S.InfoItem>
                <Code size={16} />
                <span>React + TypeScript</span>
              </S.InfoItem>
              <S.InfoItem>
                <Code size={16} />
                <span>Node.js + Express</span>
              </S.InfoItem>
              <S.InfoItem>
                <Code size={16} />
                <span>MySQL</span>
              </S.InfoItem>
              <S.InfoItem>
                <Code size={16} />
                <span>Styled Components</span>
              </S.InfoItem>
            </S.LinkList>
          </S.LinkColumn>

          <S.LinkColumn>
            <S.ColumnTitle>Desenvolvedor</S.ColumnTitle>
            <S.LinkList>
              <S.InfoItem>
                <S.ExternalLink
                  href="https://github.com/RuanValenca"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </S.ExternalLink>
              </S.InfoItem>
              <S.InfoItem>
                <S.ExternalLink
                  href="https://www.linkedin.com/in/ruanvalenca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail size={16} />
                  <span>Contato</span>
                </S.ExternalLink>
              </S.InfoItem>
            </S.LinkList>
          </S.LinkColumn>
        </S.LinksGrid>
      </S.TopSection>

      <S.Divider />

      <S.BottomSection>
        <S.Copyright>
          © {new Date().getFullYear()} Delishare. Todos os direitos reservados.
        </S.Copyright>
        <S.Credits>
          Desenvolvido com
          <S.AuthorName>Ruan Valença</S.AuthorName>
        </S.Credits>
      </S.BottomSection>
    </S.Container>
  );
}
