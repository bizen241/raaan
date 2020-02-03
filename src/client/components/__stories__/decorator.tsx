import { DecoratorFn } from "@storybook/react";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import { defaultSettings, SettingsContext } from "../project/Context";
import { Style } from "../project/Style";
import { Column } from "../ui";

export const decorator: DecoratorFn = storyFn => {
  const { store } = configureStore();

  return (
    <Provider store={store}>
      <SettingsContext.Provider value={defaultSettings}>
        <Style>
          <Column p={1}>{storyFn()}</Column>
        </Style>
      </SettingsContext.Provider>
    </Provider>
  );
};
