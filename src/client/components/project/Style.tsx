import * as React from "react";
import { useContext, useEffect, useMemo, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "../../style";
import { ConfigContext } from "./Context";

export const Style = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const { theme = "default" } = useContext(ConfigContext);

  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme !== "default" && theme !== "system" && theme !== undefined) {
      return setThemeName(theme);
    }

    const handler = ({ matches }: MediaQueryListEvent) => {
      setThemeName(matches ? "dark" : "light");
    };

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addListener(handler);

    setThemeName(mediaQueryList.matches ? "dark" : "light");

    return () => mediaQueryList.removeListener(handler);
  }, [theme]);

  return (
    <ThemeProvider
      theme={useMemo(
        () => ({
          name: themeName,
          background: themeName === "light" ? "#eeeeee" : "#30404d",
          accent: "#eeeeee"
        }),
        [themeName]
      )}
    >
      <div className={themeName === "light" ? "bp3-light" : "bp3-dark"}>
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
