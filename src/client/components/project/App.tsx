import { I18nProvider, Trans } from "@lingui/react";
import * as React from "react";
import { Provider } from "react-redux";
import { catalogs } from "../../intl";
import { configureStore } from "../../store";

export const App: React.FunctionComponent = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
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
      </I18nProvider>
    </Provider>
  );
};
