import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
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

  const muiTheme = createMuiTheme({
    palette: {
      type: themeName,
      background: {
        paper: themeName === "light" ? "#fff" : "#1e1e1e"
      }
    }
  });

  return (
    <ThemeProvider
      theme={useMemo(
        () => ({
          name: themeName,
          base: themeName === "light" ? "#f5f5f5" : "#121212",
          main: themeName === "light" ? "#333333" : "#ffffff",
          accent: "#eeeeee"
        }),
        [themeName]
      )}
    >
      <MuiThemeProvider theme={muiTheme}>
        <div>
          <GlobalStyle />
          {children}
        </div>
      </MuiThemeProvider>
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
    color: ${p => p.theme.main};
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  .MuiTableCell-root.MuiTableCell-footer.MuiTablePagination-root {
    border: none;
  }
`;
