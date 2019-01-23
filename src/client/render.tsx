import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/project/App";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

export const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};
