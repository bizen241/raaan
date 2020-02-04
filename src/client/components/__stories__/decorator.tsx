import { DecoratorFn } from "@storybook/react";
import React from "react";
import { Provider } from "react-redux";
import "../../intl";
import { configureStore } from "../../store";
import { IntlProvider } from "../project/IntlProvider";
import { ThemeProvider } from "../project/ThemeProvider";
import { Column } from "../ui";

export const decorator: DecoratorFn = storyFn => {
  const { store } = configureStore();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <IntlProvider>
          <Column p={1}>{storyFn()}</Column>
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  );
};
