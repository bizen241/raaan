import { CssBaseline } from "@material-ui/core";
import blueGrey from "@material-ui/core/colors/blueGrey";
import teal from "@material-ui/core/colors/teal";
import { createMuiTheme, makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
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
        default: themeName === "light" ? "#f5f5f5" : "#121212",
        paper: themeName === "light" ? "#fff" : "#1e1e1e"
      },
      primary: teal,
      secondary: blueGrey
    }
  });

  useStyles();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
});

const useStyles = makeStyles({
  "@global": {
    ".MuiTableCell-root.MuiTableCell-footer.MuiTablePagination-root": {
      border: "none"
    }
  }
});
