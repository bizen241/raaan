import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { Edit } from "../pages/Edit";
import { Home } from "../pages/Home";
import { New } from "../pages/New";
import { NotFound } from "../pages/NotFound";

export type PageProps = RouteComponentProps<{ id: string }>;

export const Router = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/revisions/new" component={New} />
    <Route exact={true} path="/revisions/:id/edit" component={Edit} />
    <Route component={NotFound} />
  </Switch>
);
