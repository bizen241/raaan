import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "../../store";
import { Initializer } from "./Initializer";
import { Router } from "./Router";
import { Translator } from "./Translator";

export const App: React.FunctionComponent = () => {
  const { store, history, persistor } = configureStore();

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate persistor={persistor}>
          <Translator>
            <Initializer>
              <Router />
            </Initializer>
          </Translator>
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  );
};
