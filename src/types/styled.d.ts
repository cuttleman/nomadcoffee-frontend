import "styled-components";

declare module "styled-components" {
  type ThemeObject = {
    fontColor: string;
    bgColor: string;
  };
  export interface DefaultTheme extends ThemeObject {}
}
