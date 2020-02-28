import { ConnectedRouter } from "connected-react-router";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../../intl";
import { history, persistor, store } from "../../store";
import { ErrorBoundary } from "./ErrorBoundary";
import { Initializer } from "./Initializer";
import { IntlProvider } from "./IntlProvider";
import { LoadingApp } from "./LoadingApp";
import { Router } from "./Router";
import { ThemeProvider } from "./ThemeProvider";

export const App: React.FunctionComponent = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <Suspense fallback={<LoadingApp />}>
            <ThemeProvider>
              <IntlProvider>
                <Initializer>
                  <Router />
                </Initializer>
              </IntlProvider>
            </ThemeProvider>
          </Suspense>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
