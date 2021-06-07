import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html,body{
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
    font-weight: 400;
  }
  *{
    &:not(body):not(html){
      transition: all 0.2s linear;
    }
    color: ${(props) => props.theme.defaultColor};
    box-sizing: border-box;
  }
  button{
    outline: none;
    cursor: pointer;
  }
`;

export const darkTheme: DefaultTheme = {
  mainFontColor: "#1B9CFC",
  mainColor: "#60a3bc",
  mainBtnColor: "#1e90ff",
  mainBgColor: "#353b48",
  defaultColor: "white",
};

export const lightTheme: DefaultTheme = {
  mainFontColor: "#e58e26",
  mainColor: "#fad390",
  mainBtnColor: "#ff6b6b",
  mainBgColor: "#ffffff",
  defaultColor: "black",
};
