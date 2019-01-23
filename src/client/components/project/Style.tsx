import * as React from "react";
import { connector } from "../../reducers";
import { createGlobalStyle, Theme, ThemeProvider } from "../../style";
import { Column } from "../ui";

const theme: Theme = {
  background: "#30404d",
  border: "#404040",
  text: "#f8f8f8",
  input: "#202020",
  container: "#282828",
  focus: "#3e50b4",
  accent: "#888888"
};

export const Style = connector(
  () => ({}),
  () => ({}),
  ({ children }) => {
    return (
      <ThemeProvider theme={theme}>
        <Column className="bp3-dark">
          <GlobalStyle />
          {children}
        </Column>
      </ThemeProvider>
    );
  }
);

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    background-color: ${p => p.theme.background};
    font-family: system-ui, sans-serif;
    font-size: 18px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`;
