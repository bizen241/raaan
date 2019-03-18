import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "../../store";
import { ErrorBoundary } from "./ErrorBoundary";
import { Initializer } from "./Initializer";
import { Router } from "./Router";
import { Style } from "./Style";
import { Translator } from "./Translator";

export const App: React.FunctionComponent = () => {
  const { store, history, persistor } = configureStore();

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ConnectedRouter history={history}>
            <Initializer>
              <Translator>
                <Style>
                  <Router />
                </Style>
              </Translator>
            </Initializer>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};
