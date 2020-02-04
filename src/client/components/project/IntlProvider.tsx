import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserSettings } from "../../hooks/useUserSettings";

export const IntlProvider = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const { i18n } = useTranslation();
  const userSettings = useUserSettings();

  useEffect(() => {
    i18n.changeLanguage(userSettings["ui.lang"]);
  }, [userSettings["ui.lang"]]);

  return <>{children}</>;
});
