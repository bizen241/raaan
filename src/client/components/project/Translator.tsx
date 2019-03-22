import { I18nProvider } from "@lingui/react";
import * as React from "react";
import { useContext } from "react";
import { catalogs } from "../../intl";
import { ConfigContext } from "./Initializer";

export const Translator = React.memo<{ children: React.ReactNode }>(({ children }) => {
  const config = useContext(ConfigContext);
  const language = config.lang || "en";

  return (
    <I18nProvider language={language} catalogs={catalogs}>
      {children}
    </I18nProvider>
  );
});
