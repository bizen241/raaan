import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

const {
  default: styled,
  css,
  keyframes,
  createGlobalStyle,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<{
  background: string;
  accent: string;
}>;

export { styled, css, keyframes, createGlobalStyle, ThemeProvider };
