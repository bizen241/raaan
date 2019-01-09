import * as React from "react";
import { connector } from "../../reducers";
import { createGlobalStyle, Theme, ThemeProvider } from "../../style";

const theme: Theme = {
  background: "#fafafa",
  border: "#aaa",
  text: "#333"
};

export const Style = connector(
  () => ({}),
  () => ({}),
  ({ children }) => {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          {children}
        </>
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
`;
