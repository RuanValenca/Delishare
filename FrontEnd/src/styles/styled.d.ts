import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      blueSchema: {
        light: string;
        default: string;
        dark: string;
      };
      greenSchema: {
        light: string;
        default: string;
        dark: string;
      };
      gradientBackgroundLight: string;
      gradientBackground: string;
      background: string;
      foreground: string;
      primary: string;
      secondary: string;
      muted: string;
      border: string;
      error: string;
      white1: string;
      white2: string;
      white3: string;
      shadow: string;
    };

    font: {
      size: {
        textXs: string;
        textSm: string;
        textBase: string;
        textLg: string;
        textXl: string;
        text2Xl: string;
        text3Xl: string;
        text4Xl: string;
      };
      weight: {
        light: string;
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
      };
      colors: {
        error: string;
        lightBlue: string;
        mainText: string;
        DarkBlue: string;
        secondaryText: string;
        gradientText: string;
        whiteText: string;
        muted: string;
        placeholder: string;
        black: string;
      };
    };
    breakpoint: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
}
