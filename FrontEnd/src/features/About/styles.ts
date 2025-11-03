import styled from "styled-components";
import bg from "../../assets/img/programming.jpg";

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

export const DivInfo = styled.div`
  padding: 0rem 4rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: 40% 60%;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DivText = styled.div`
  height: 200px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.blueSchema.light};
`;

export const Title = styled.h1`
  background: ${({ theme }) => theme.font.colors.gradientText};
  background-clip: text;
  color: transparent;
  font-size: ${({ theme }) => theme.font.size.text4Xl};
`;

export const TitleInfo = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  font-size: ${({ theme }) => theme.font.size.text2Xl};
`;

export const Description = styled.p`
  width: 100%;
  height: fit-content;
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textLg};
  font-weight: ${({ theme }) => theme.font.weight.light};
`;

export const DivImage = styled.div`
  border-radius: 12px;
  position: relative;
  display: flex;
  align-items: center;
  height: 110%;
  width: 100%;

  background-image: url(${bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const Tech = styled.div`
  padding: 4rem;
  width: 100%;
  height: 90vh;
  text-align: center;
  background: ${({ theme }) => theme.colors.greenSchema.light};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

export const TitleTech = styled.h2`
  color: ${({ theme }) => theme.font.colors.DarkBlue};
  font-size: ${({ theme }) => theme.font.size.text3Xl};
  grid-column: span 3;
`;

export const DescriptionTech = styled.h2`
  color: ${({ theme }) => theme.font.colors.secondaryText};
  font-size: ${({ theme }) => theme.font.size.textSm};
  grid-column: span 3;
`;
