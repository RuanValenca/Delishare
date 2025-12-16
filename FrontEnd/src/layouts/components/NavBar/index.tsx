import { ChefHat } from "lucide-react";
import { House, Newspaper, BookOpen, Info, SignOut } from "phosphor-react";
import * as S from "./styles";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDelishare } from "../../../hooks/useProvider";

export default function NavBar() {
  const { logout } = useDelishare();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const storedUser = localStorage.getItem("userInfo"); 
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  
  const haspfp = Boolean(
    parsedUser?.pfp && parsedUser.pfp.trim() !== ""
  );
  
  return (
    <S.Container>
      <S.DivName>
        <ChefHat size={32} color={theme.font.colors.lightBlue} />
        <S.Name>Delishare</S.Name>
      </S.DivName>

      <S.DivLink>
        <S.LinkItem onClick={() => navigate("/Delishare")}>
          <S.LinkText>Home</S.LinkText>
          <S.LinkIcon>
            <House size={24} weight="fill" />
          </S.LinkIcon>
        </S.LinkItem>
        <S.LinkItem onClick={() => navigate("/feed")}>
          <S.LinkText>Feed</S.LinkText>
          <S.LinkIcon>
            <Newspaper size={24} weight="fill" />
          </S.LinkIcon>
        </S.LinkItem>
        <S.LinkItem onClick={() => navigate("/recipes")}>
          <S.LinkText>Receitas</S.LinkText>
          <S.LinkIcon>
            <BookOpen size={24} weight="fill" />
          </S.LinkIcon>
        </S.LinkItem>
        <S.LinkItem onClick={() => navigate("/about")}>
          <S.LinkText>Sobre</S.LinkText>
          <S.LinkIcon>
            <Info size={24} weight="fill" />
          </S.LinkIcon>
        </S.LinkItem>
        <S.LinkItem onClick={() => handleLogout()}>
          <S.LinkText>
            <SignOut size={20} />
          </S.LinkText>
          <S.LinkIcon>
            <SignOut size={24} weight="fill" />
          </S.LinkIcon>
        </S.LinkItem>
        {haspfp ? (
          <S.ProfileImage
            src={parsedUser.pfp}
            onClick={() => navigate("/settings")}
          />
        ) : (
          <S.SettingIcon onClick={() => navigate("/settings")} />
        )}
      </S.DivLink>
    </S.Container>
  );
}
