import * as React from "react";
import { useContext, useMemo } from "react";
import { createGlobalStyle, ThemeProvider } from "../../style";
import { ConfigContext } from "./Initializer";

export const Style = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const config = useContext(ConfigContext);
  const theme = config.theme || "dark";
  const accent = "#eeeeee";

  return (
    <ThemeProvider
      theme={useMemo(
        () => ({
          background: theme === "light" ? "#eeeeee" : "#30404d",
          accent
        }),
        [theme, accent]
      )}
    >
      <div className={theme === "light" ? "bp3-light" : "bp3-dark"}>
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
