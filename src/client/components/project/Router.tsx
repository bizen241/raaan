import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { Config } from "../pages/Config";
import { Creator } from "../pages/Creator";
import { Edit } from "../pages/Edit";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { New } from "../pages/New";
import { NotFound } from "../pages/NotFound";

export type PageProps = RouteComponentProps<{ id: string }>;

export const Router = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/creator" component={Creator} />
    <Route exact={true} path="/contents/new" component={New} />
    <Route exact={true} path="/contents/:id/edit" component={Edit} />
    <Route exact={true} path="/login" component={Login} />
    <Route exact={true} path="/config" component={Config} />
    <Route component={NotFound} />
  </Switch>
);
