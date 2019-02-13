import { I18nProvider } from "@lingui/react";
import * as React from "react";
import { catalogs } from "../../intl";
import { connector } from "../../reducers";

export const Translator = connector(
  state => ({
    language: state.config.current.settings.lang
  }),
  () => ({}),
  ({ language = "ja", children }) => {
    return (
      <I18nProvider language={language} catalogs={catalogs}>
        {children}
      </I18nProvider>
    );
  }
);
