import { I18nProvider } from "@lingui/react";
import * as React from "react";
import { useContext, useMemo } from "react";
import { Lang } from "../../../shared/api/entities";
import { catalogs } from "../../intl";
import { ConfigContext } from "./Initializer";

export const Translator = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const { lang } = useContext(ConfigContext);

  const language = useMemo<Lang>(() => {
    if (lang === "default" || lang === "system" || lang === undefined) {
      return navigator.language.slice(0, 2) as Lang;
    } else {
      return lang;
    }
  }, [lang]);

  return (
    <I18nProvider language={language} catalogs={catalogs}>
      {children}
    </I18nProvider>
  );
});
