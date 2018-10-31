import * as React from "react";
import * as ReactDOM from "react-dom";
import { installApp } from "./install";

export const renderApp = () => {
  ReactDOM.render(
    <div>
      <main>
        <a href="/auth/github">Welcome to Raaan!</a>
      </main>
    </div>,
    document.getElementById("root")
  );

  if (process.env.NODE_ENV === "production") {
    installApp();
  }
};
