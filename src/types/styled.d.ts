import "styled-components";

declare module "styled-components" {
  type ThemeObject = {
    mainFontColor: string;
    mainColor: string;
    mainBtnColor: string;
    mainBgColor: string;
    defaultColor: "white" | "black";
  };
  export interface DefaultTheme extends ThemeObject {}
}
