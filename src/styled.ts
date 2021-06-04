import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
`;

export const darkTheme: DefaultTheme = {
  fontColor: "lightgray",
  bgColor: "black",
};

export const lightTheme: DefaultTheme = {
  fontColor: "black",
  bgColor: "lightgray",
};
