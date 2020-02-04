import { Style } from "@material-ui/icons";
import { ConnectedRouter } from "connected-react-router";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../../intl";
import { configureStore } from "../../store";
import { ErrorBoundary } from "./ErrorBoundary";
import { Initializer } from "./Initializer";
import { IntlProvider } from "./IntlProvider";
import { LoadingApp } from "./LoadingApp";
import { Router } from "./Router";

export const App: React.FunctionComponent = () => {
  const { store, history, persistor } = configureStore();

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ConnectedRouter history={history}>
            <Suspense fallback={<LoadingApp />}>
              <Style>
                <IntlProvider>
                  <Initializer>
                    <Router />
                  </Initializer>
                </IntlProvider>
              </Style>
            </Suspense>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};
