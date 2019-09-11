import * as React from "react";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { RootState } from "../../reducers";
import AccountPage from "../pages/AccountPage";
import AppPage from "../pages/AppPage";
import { EditExercisesPage } from "../pages/EditExercisesPage";
import { ExercisePage } from "../pages/ExercisePage";
import { ExercisesPage } from "../pages/ExercisesPage";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PlaylistPage } from "../pages/PlaylistPage";
import { PlaylistsPage } from "../pages/PlaylistsPage";
import { SessionsPage } from "../pages/SessionsPage";
import { SubmissionHistoryPage } from "../pages/SubmissionHistoryPage";
import { UserExercisesPage } from "../pages/UserExercisesPage";
import { UserPage } from "../pages/UserPage";
import { UserPlaylistsPage } from "../pages/UserPlaylistsPage";

export type PageProps = RouteComponentProps<{ id: string; name: string }>;

const ConfigPage = React.lazy(() => import("../pages/ConfigPage"));
const EditExercisePage = React.lazy(() => import("../pages/EditExercisePage"));

export const Router = React.memo(() => {
  const { location } = useSelector((state: RootState) => ({
    location: state.router.location
  }));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch location={location}>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/users/:id" component={UserPage} />
        <Route exact={true} path="/users/:id/exercises" component={UserExercisesPage} />
        <Route exact={true} path="/users/:id/playlists" component={UserPlaylistsPage} />
        <Route exact={true} path="/exercises" component={ExercisesPage} />
        <Route exact={true} path="/exercises/history" component={SubmissionHistoryPage} />
        <Route exact={true} path="/exercises/edit" component={EditExercisesPage} />
        <Route exact={true} path="/exercises/:id" component={ExercisePage} />
        <Route exact={true} path="/exercises/:id/edit" component={EditExercisePage} />
        <Route exact={true} path="/playlists" component={PlaylistsPage} />
        <Route exact={true} path="/playlists/:id" component={PlaylistPage} />
        <Route exact={true} path="/config" component={ConfigPage} />
        <Route exact={true} path="/account" component={AccountPage} />
        <Route exact={true} path="/sessions" component={SessionsPage} />
        <Route exact={true} path="/app" component={AppPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
});
