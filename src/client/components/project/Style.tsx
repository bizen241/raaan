import { CssBaseline } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import teal from "@material-ui/core/colors/teal";
import { createMuiTheme, makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useUserSettings } from "../../hooks/useUserSettings";

export const Style = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const userSettings = useUserSettings();
  const colorScheme = userSettings["ui.colorScheme"];

  const [isDarkMode, setMode] = useState(false);

  useEffect(() => {
    if (colorScheme !== "system") {
      return setMode(colorScheme === "dark");
    }

    const handler = ({ matches }: MediaQueryListEvent) => {
      setMode(matches);
    };

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addListener(handler);

    setMode(mediaQueryList.matches);

    return () => mediaQueryList.removeListener(handler);
  }, [colorScheme]);

  const muiTheme = createMuiTheme({
    palette: {
      type: isDarkMode ? "dark" : "light",
      background: {
        default: isDarkMode ? "#121212" : "#f5f5f5",
        paper: isDarkMode ? "#1e1e1e" : "#fff"
      },
      primary: teal,
      secondary: isDarkMode
        ? grey
        : {
            main: "#e0e0e0"
          }
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
