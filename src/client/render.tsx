import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactModal from "react-modal";
import { App } from "./components/project/App";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

export const renderApp = () => {
  const rootElement = document.getElementById("root")!;

  ReactModal.setAppElement(rootElement);
  ReactDOM.render(<App />, rootElement);
};
