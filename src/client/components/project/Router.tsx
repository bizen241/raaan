import * as React from "react";
import { Suspense } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connector } from "../../reducers";
import AccountPage from "../pages/AccountPage";
import AppPage from "../pages/AppPage";
import { EditExercisesPage } from "../pages/EditExercisesPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export type PageProps = RouteComponentProps<{ id: string }>;

const ConfigPage = React.lazy(() => import("../pages/ConfigPage"));
const EditExercisePage = React.lazy(() => import("../pages/EditExercisePage"));

export const Router = connector(
  state => ({
    location: state.router.location
  }),
  () => ({}),
  ({ location }) => {
    return (
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch location={location}>
              <Route exact={true} path="/" component={HomePage} />
              <Route exact={true} path="/exercises" component={EditExercisesPage} />
              <Route exact={true} path="/exercises/private" component={EditExercisesPage} />
              <Route exact={true} path="/exercises/edit" component={EditExercisesPage} />
              <Route exact={true} path="/exercises/:id/edit" component={EditExercisePage} />
              <Route exact={true} path="/login" component={LoginPage} />
              <Route exact={true} path="/config" component={ConfigPage} />
              <Route exact={true} path="/account" component={AccountPage} />
              <Route exact={true} path="/app" component={AppPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
    );
  }
);
