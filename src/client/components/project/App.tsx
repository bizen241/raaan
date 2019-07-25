import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "../../store";
import { Context } from "./Context";
import { ErrorBoundary } from "./ErrorBoundary";
import { Initializer } from "./Initializer";
import { Router } from "./Router";
import { Style } from "./Style";

export const App: React.FunctionComponent = () => {
  const { store, history, persistor } = configureStore();

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ConnectedRouter history={history}>
            <Initializer>
              <Context>
                <Style>
                  <Router />
                </Style>
              </Context>
            </Initializer>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};
