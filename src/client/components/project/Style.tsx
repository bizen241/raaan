import * as React from "react";
import { useContext } from "react";
import { createGlobalStyle, Theme, ThemeProvider } from "../../style";
import { UserContext } from "./Initializer";

const themes: { [key: string]: Theme } = {
  dark: {
    background: "#30404d"
  },
  light: {
    background: "#eeeeee"
  }
};

export const Style = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const currentUser = useContext(UserContext);
  const themeName = currentUser.settings.theme || "dark";

  return (
    <ThemeProvider theme={themes[themeName]}>
      <div className={themeName === "dark" ? "bp3-dark" : "bp3-light"}>
        <GlobalStyle />
        {children}
      </div>
    </ThemeProvider>
  );
});

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    background-color: ${p => p.theme.background};
    overflow-x: hidden;
    overflow-y: scroll;
  }

  #root {
    display: flex;
    flex-direction: column;
  }
`;
