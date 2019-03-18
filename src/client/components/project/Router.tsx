import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connector } from "../../reducers";
import { Config } from "../pages/Config";
import { Creator } from "../pages/Creator";
import { Edit } from "../pages/Edit";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";

export type PageProps = RouteComponentProps<{ id: string }>;

export const Router = connector(
  state => ({
    location: state.router.location
  }),
  () => ({}),
  ({ location }) => {
    return (
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Switch location={location}>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/creator" component={Creator} />
            <Route exact={true} path="/content-revisions/:id/edit" component={Edit} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/config" component={Config} />
            <Route component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
);
