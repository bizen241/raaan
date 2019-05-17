import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connector } from "../../reducers";
import { ConfigPage } from "../pages/ConfigPage";
import { EditExerciseDetailPage } from "../pages/EditExerciseDetailPage";
import { EditExercisesPage } from "../pages/EditExercisesPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";

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
            <Route exact={true} path="/" component={HomePage} />
            <Route exact={true} path="/exercises" component={EditExercisesPage} />
            <Route exact={true} path="/exercises/private" component={EditExercisesPage} />
            <Route exact={true} path="/exercises/edit" component={EditExercisesPage} />
            <Route exact={true} path="/exercise-details/:id/edit" component={EditExerciseDetailPage} />
            <Route exact={true} path="/login" component={LoginPage} />
            <Route exact={true} path="/config" component={ConfigPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
);
