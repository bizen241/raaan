import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import * as uuid from "uuid";
import { Edit } from "../pages/Edit";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";

export type PageProps = RouteComponentProps<{ id: string }>;

export const Router = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/revisions/new" render={() => <Redirect to={`/revisions/${uuid()}/edit`} />} />
    <Route exact={true} path="/revisions/:id/edit" component={Edit} />
    <Route component={NotFound} />
  </Switch>
);
