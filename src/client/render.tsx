import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/project/App";
import { installApp } from "./install";

export const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));

  if (process.env.NODE_ENV === "production") {
    installApp(navigator.serviceWorker);
  }
};
