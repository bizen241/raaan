import * as React from "react";
import { connector } from "../../reducers";
import { createGlobalStyle, Theme, ThemeProvider } from "../../style";
import { Column } from "../ui";

const themes: { [key: string]: Theme } = {
  dark: {
    background: "#30404d"
  },
  light: {
    background: "#eeeeee"
  }
};

export const Style = connector(
  state => ({
    themeName: state.config.current.settings.theme
  }),
  () => ({}),
  ({ themeName = "dark", children }) => {
    return (
      <ThemeProvider theme={themes[themeName]}>
        <Column className={themeName === "dark" ? "bp3-dark" : "bp3-light"}>
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
