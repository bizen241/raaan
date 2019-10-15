import * as React from "react";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { RootState } from "../../reducers";
import AppPage from "../pages/AppPage";
import { CreatePage } from "../pages/contents/CreatePage";
import { SearchPage } from "../pages/contents/SearchPage";
import { ExercisePage } from "../pages/exercises/ExercisePage";
import { HomePage } from "../pages/HomePage";
import { LoadingPage } from "../pages/LoadingPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import EditPlaylistPage from "../pages/playlists/EditPlaylistPage";
import { PlaylistPage } from "../pages/playlists/PlaylistPage";
import AccountPage from "../pages/user/AccountPage";
import { ConfigPage } from "../pages/user/ConfigPage";
import { HistoryPage } from "../pages/user/HistoryPage";
import { SecurityPage } from "../pages/user/SecurityPage";
import { UserContentsPage } from "../pages/users/UserContentsPage";
import { UserPage } from "../pages/users/UserPage";

export type PageProps = RouteComponentProps<{ id: string; name: string }>;

const EditExercisePage = React.lazy(() => import("../pages/exercises/EditExercisePage"));

export const Router = React.memo(() => {
  const { location } = useSelector((state: RootState) => ({
    location: state.router.location
  }));

  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch location={location}>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/app" component={AppPage} />

        <Route exact={true} path="/contents/search" component={SearchPage} />
        <Route exact={true} path="/contents/create" component={CreatePage} />

        <Route exact={true} path="/user/config" component={ConfigPage} />
        <Route exact={true} path="/user/account" component={AccountPage} />
        <Route exact={true} path="/user/sessions" component={SecurityPage} />
        <Route exact={true} path="/user/history" component={HistoryPage} />

        <Route exact={true} path="/users/:id" component={UserPage} />
        <Route exact={true} path="/users/:id/contents" component={UserContentsPage} />

        <Route exact={true} path="/exercises/:id" component={ExercisePage} />
        <Route exact={true} path="/exercises/:id/edit" component={EditExercisePage} />

        <Route exact={true} path="/playlists/:id" component={PlaylistPage} />
        <Route exact={true} path="/playlists/:id/edit" component={EditPlaylistPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
});
