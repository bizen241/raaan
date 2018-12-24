import { I18nProvider } from "@lingui/react";
import * as React from "react";
import { catalogs } from "../../intl";
import { connector } from "../../reducers";

export const Translator = connector(
  () => ({}),
  () => ({}),
  ({ children }) => {
    return (
      <I18nProvider language="ja" catalogs={catalogs}>
        {children}
      </I18nProvider>
    );
  }
);
