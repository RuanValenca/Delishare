import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Lato';
    src: url('/assets/fonts/LatoRegular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  body {
    font-family: 'Lato';
    background-color: #fafafa;
    color: #333;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }
  
   h1, h2, h3, h4, h5, h6, p, span, a {
    font-family: 'Lato', sans-serif;
  }
`;

export default GlobalStyles;
