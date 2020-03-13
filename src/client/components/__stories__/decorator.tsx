import { radios } from "@storybook/addon-knobs";
import { DecoratorFn } from "@storybook/react";
import React, { Suspense, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Permission } from "../../../shared/api/entities";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useUserSettings } from "../../hooks/useUserSettings";
import "../../intl";
import { actions, useSelector } from "../../reducers";
import { persistor, store } from "../../store";
import { IntlProvider } from "../project/IntlProvider";
import { LoadingApp } from "../project/LoadingApp";
import { ThemeProvider } from "../project/ThemeProvider";
import { Column } from "../ui";

export const decorator: DecoratorFn = storyFn => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Suspense fallback={<LoadingApp />}>
        <ThemeProvider>
          <IntlProvider>
            <Settings />
            <Column p={1}>{storyFn()}</Column>
          </IntlProvider>
        </ThemeProvider>
      </Suspense>
    </PersistGate>
  </Provider>
);

const Settings = () => {
  const dispatch = useDispatch();

  const { currentUser } = useCurrentUser();
  const userSettings = useUserSettings();

  const userConfigId = useSelector(state => state.app.userConfigId);

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
  const permission = radios<Permission>(
    "permission",
    {
      Owner: "Owner",
      Admin: "Admin",
      Write: "Write",
      Read: "Read",
      Guest: "Guest"
    },
    currentUser.permission
  );

  useEffect(() => {
    dispatch(
      actions.buffers.update("UserConfig", userConfigId, {
        settings: {
          ...userSettings,
          "ui.colorScheme": theme
        }
      })
    );
  }, [theme]);
  useEffect(() => {
    dispatch(
      actions.buffers.update("UserConfig", userConfigId, {
        settings: {
          ...userSettings,
          "ui.lang": lang
        }
      })
    );
  }, [lang]);
  useEffect(() => {
    dispatch(
      actions.buffers.update("User", currentUser.id, {
        permission
      })
    );
  }, [permission]);

  useEffect(() => {
    dispatch(
      actions.cache.search(
        "UserDiaryEntry",
        {
          targetId: currentUser.id
        },
        {
          ids: [],
          count: 0,
          entities: {}
        }
      )
    );
  }, []);

  return null;
};
