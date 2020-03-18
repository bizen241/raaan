import { radios } from "@storybook/addon-knobs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Permission } from "../../../../shared/api/entities";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useUserSettings } from "../../../hooks/useUserSettings";
import { actions, useSelector } from "../../../reducers";

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
