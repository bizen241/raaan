import { DecoratorFn } from "@storybook/react";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../../../intl";
import { persistor, store } from "../../../store";
import { IntlProvider } from "../../project/IntlProvider";
import { LoadingApp } from "../../project/LoadingApp";
import { ThemeProvider } from "../../project/ThemeProvider";
import { Column } from "../../ui";
import { Entities } from "./Entities";
import { Knobs } from "./Knobs";

export const decorator: DecoratorFn = storyFn => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Suspense fallback={<LoadingApp />}>
        <ThemeProvider>
          <IntlProvider>
            <Knobs />
            <Entities />
            <Column p={1}>{storyFn()}</Column>
          </IntlProvider>
        </ThemeProvider>
      </Suspense>
    </PersistGate>
  </Provider>
);