import { radios } from "@storybook/addon-knobs";
import { DecoratorFn } from "@storybook/react";
import React, { Suspense, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import "../../intl";
import { actions, useSelector } from "../../reducers";
import { guestUserConfig } from "../../reducers/cache";
import { store } from "../../store";
import { IntlProvider } from "../project/IntlProvider";
import { LoadingApp } from "../project/LoadingApp";
import { ThemeProvider } from "../project/ThemeProvider";
import { Column } from "../ui";

export const decorator: DecoratorFn = storyFn => (
  <Provider store={store}>
    <Suspense fallback={<LoadingApp />}>
      <ThemeProvider>
        <IntlProvider>
          <Settings />
          <Column p={1}>{storyFn()}</Column>
        </IntlProvider>
      </ThemeProvider>
    </Suspense>
  </Provider>
);

const Settings = () => {
  const dispatch = useDispatch();

  const userConfig = useSelector(state => state.buffers.UserConfig[guestUserConfig.id]);
  const userSettings = userConfig ? userConfig.settings : {};

  const theme = radios(
    "theme",
    {
      dark: "dark",
      light: "light"
    },
    "light"
  );
  const lang = radios(
    "lang",
    {
      en: "en",
      ja: "ja"
    },
    "en"
  );

  useEffect(() => {
    dispatch(
      actions.buffers.update("UserConfig", guestUserConfig.id, {
        settings: {
          ...userSettings,
          "ui.colorScheme": theme
        }
      })
    );
  }, [theme]);
  useEffect(() => {
    dispatch(
      actions.buffers.update("UserConfig", guestUserConfig.id, {
        settings: {
          ...userSettings,
          "ui.lang": lang
        }
      })
    );
  }, [lang]);

  return null;
};
