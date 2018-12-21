import { I18nProvider, Trans } from "@lingui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { installApp } from "./install";
import { catalogs } from "./intl";

export const renderApp = () => {
  ReactDOM.render(
    <I18nProvider language="ja" catalogs={catalogs}>
      <div>
        <main>
          <h1>Typing</h1>
          <a href="/auth/github">
            <Trans>ログイン</Trans>
          </a>
          /
          <a href="/logout">
            <Trans>ログアウト</Trans>
          </a>
        </main>
      </div>
    </I18nProvider>,
    document.getElementById("root")
  );

  if (process.env.NODE_ENV === "production") {
    installApp(navigator.serviceWorker);
  }
};
