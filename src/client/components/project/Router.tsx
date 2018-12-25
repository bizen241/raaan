import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

export const Router = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
);
