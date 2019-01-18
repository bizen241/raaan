import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

export interface Theme {
  background: string;
  border: string;
  text: string;
  input: string;
  container: string;
  focus: string;
  accent: string;
}

const {
  default: styled,
  css,
  keyframes,
  createGlobalStyle,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<Theme>;

export { styled, css, keyframes, createGlobalStyle, ThemeProvider };
