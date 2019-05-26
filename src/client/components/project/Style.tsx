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
          base: themeName === "light" ? "#eeeeee" : "#212121",
          main: themeName === "light" ? "#333333" : "#eeeeee",
          accent: "#eeeeee"
        }),
        [themeName]
      )}
    >
      <div>
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
    background-color: ${p => p.theme.base};
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: 16px;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  .public-DraftEditor-content {
    padding: 0 10px;
    border-radius: 3px;
  }

  .public-DraftEditor-content:focus {
    box-shadow: 0 0 0 1px #137cbd, 0 0 0 3px rgba(19, 124, 189, 0.3), inset 0 1px 1px rgba(16, 22, 26, 0.2);
  }
`;
