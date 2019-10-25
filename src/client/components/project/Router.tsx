import * as React from "react";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { RootState } from "../../reducers";
import { AppPage } from "../pages/AppPage";
import { EditExercisesPage } from "../pages/exercises/EditExercisesPage";
import { ExercisePage } from "../pages/exercises/ExercisePage";
import { ExercisesPage } from "../pages/exercises/ExercisesPage";
import { HomePage } from "../pages/HomePage";
import { LoadingPage } from "../pages/LoadingPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PlaylistBookmarksPage } from "../pages/playlists/PlaylistBookmarksPage";
import { PlaylistPage } from "../pages/playlists/PlaylistPage";
import { EditExerciseReportPage } from "../pages/reports/EditExerciseReportPage";
import { SubmissionsPage } from "../pages/submissions/SubmissionsPage";
import { TagPage } from "../pages/tags/TagPage";
import { UserAccountPage } from "../pages/user/UserAccountPage";
import { UserConfigPage } from "../pages/user/UserConfigPage";
import { UserSessionsPage } from "../pages/user/UserSessionsPage";
import { UserContentsPage } from "../pages/users/UserContentsPage";
import { UserPage } from "../pages/users/UserPage";

export type PageProps = RouteComponentProps<{ id: string; name: string }>;

const EditExercisePage = React.lazy(() => import("../pages/exercises/EditExercisePage"));
const EditPlaylistPage = React.lazy(() => import("../pages/playlists/EditPlaylistPage"));

export const Router = React.memo(() => {
  const { location } = useSelector((state: RootState) => ({
    location: state.router.location
  }));

  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch location={location}>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/app" component={AppPage} />

        <Route exact={true} path="/user-config" component={UserConfigPage} />
        <Route exact={true} path="/user-account" component={UserAccountPage} />
        <Route exact={true} path="/user-sessions" component={UserSessionsPage} />

        <Route exact={true} path="/submissions" component={SubmissionsPage} />

        <Route exact={true} path="/users/:id" component={UserPage} />
        <Route exact={true} path="/users/:id/contents" component={UserContentsPage} />

        <Route exact={true} path="/exercises" component={ExercisesPage} />
        <Route exact={true} path="/exercises/edit" component={EditExercisesPage} />
        <Route exact={true} path="/exercises/:id" component={ExercisePage} />
        <Route exact={true} path="/exercises/:id/edit" component={EditExercisePage} />

        <Route exact={true} path="/playlists/:id" component={PlaylistPage} />
        <Route exact={true} path="/playlists/:id/edit" component={EditPlaylistPage} />

        <Route exact={true} path="/tags/:name" component={TagPage} />

        <Route exact={true} path="/playlist-bookmarks" component={PlaylistBookmarksPage} />

        <Route exact={true} path="/exercise-reports/:id/edit" component={EditExerciseReportPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
});
