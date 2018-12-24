import { I18nProvider as Translator, Trans } from "@lingui/react";
import * as React from "react";
import { Provider } from "react-redux";
import { catalogs } from "../../intl";
import { configureStore } from "../../store";
import { Initializer } from "./Initializer";

export const App: React.FunctionComponent = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Translator language="ja" catalogs={catalogs}>
        <Initializer>
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
        </Initializer>
      </Translator>
    </Provider>
  );
};
