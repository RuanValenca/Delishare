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
  
* {
    font-family: 'Lato', sans-serif;
  }
`;

export default GlobalStyles;
