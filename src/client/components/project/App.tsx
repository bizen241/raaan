import { Trans } from "@lingui/react";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "../../store";
import { Initializer } from "./Initializer";
import { Translator } from "./Translator";

export const App: React.FunctionComponent = () => {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Translator>
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
      </PersistGate>
    </Provider>
  );
};
