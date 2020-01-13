import React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/project/App";

export const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};
