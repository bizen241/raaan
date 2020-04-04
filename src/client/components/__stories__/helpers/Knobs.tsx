import { button, radios } from "@storybook/addon-knobs";
import { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import { Permission } from "../../../../shared/api/entities";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useUserSettings } from "../../../hooks/useUserSettings";
import { actions, useSelector } from "../../../reducers";
import { guestUser, guestUserAccount, guestUserConfig } from "../../../reducers/guest";

export const Knobs = () => {
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

  button("reset", async () => {
    batch(() => {
      dispatch(actions.cache.purge(undefined, undefined));
      dispatch(
        actions.cache.get({
          User: {
            [guestUser.id]: guestUser
          },
          UserAccount: {
            [guestUserAccount.id]: guestUserAccount
          },
          UserConfig: {
            [guestUserConfig.id]: guestUserConfig
          }
        })
      );
      dispatch(
        actions.app.ready({
          userId: guestUser.id,
          userAccountId: guestUserAccount.id,
          userConfigId: guestUserConfig.id
        })
      );
    });
  });

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

  return null;
};
