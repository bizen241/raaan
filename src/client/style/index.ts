import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

const {
  default: styled,
  css,
  keyframes,
  createGlobalStyle,
  ThemeConsumer,
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<{
  name: "dark" | "light";
  background: string;
  accent: string;
}>;

export { styled, css, keyframes, createGlobalStyle, ThemeConsumer, ThemeProvider };
