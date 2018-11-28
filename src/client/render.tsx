import { I18nProvider, Trans } from "@lingui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { installApp } from "./install";
import { catalogs } from "./intl";

export const renderApp = () => {
  ReactDOM.render(
    <I18nProvider language="en" catalogs={catalogs}>
      <div>
        <main>
          <h1>
            <Trans>Welcome to Raan!</Trans>
          </h1>
          <a href="/auth/github">Login</a>/<a href="/logout">Logout</a>
        </main>
      </div>
    </I18nProvider>,
    document.getElementById("root")
  );

  if (process.env.NODE_ENV === "production") {
    installApp(navigator.serviceWorker);
  }
};
