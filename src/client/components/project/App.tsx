import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "../../store";
import { Initializer } from "./Initializer";
import { Router } from "./Router";
import { Style } from "./Style";
import { Translator } from "./Translator";

export const App: React.FunctionComponent = () => {
  const { store, history, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <Translator>
            <Initializer>
              <Style>
                <Router />
              </Style>
            </Initializer>
          </Translator>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};
