import * as React from "react";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { RootState } from "../../reducers";
import AccountPage from "../pages/AccountPage";
import AppPage from "../pages/AppPage";
import { ConfigPage } from "../pages/ConfigPage";
import { CreatePage } from "../pages/CreatePage";
import EditPlaylistPage from "../pages/EditPlaylistPage";
import { ExercisePage } from "../pages/ExercisePage";
import { HistoryPage } from "../pages/HistoryPage";
import { HomePage } from "../pages/HomePage";
import { LoadingPage } from "../pages/LoadingPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PlaylistPage } from "../pages/PlaylistPage";
import { SearchPage } from "../pages/SearchPage";
import { SecurityPage } from "../pages/SecurityPage";
import { UserContentsPage } from "../pages/UserContentsPage";
import { UserPage } from "../pages/UserPage";

export type PageProps = RouteComponentProps<{ id: string; name: string }>;

const EditExercisePage = React.lazy(() => import("../pages/EditExercisePage"));

export const Router = React.memo(() => {
  const { location } = useSelector((state: RootState) => ({
    location: state.router.location
  }));

  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch location={location}>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/app" component={AppPage} />
        <Route exact={true} path="/config" component={ConfigPage} />
        <Route exact={true} path="/account" component={AccountPage} />
        <Route exact={true} path="/security" component={SecurityPage} />
        <Route exact={true} path="/search" component={SearchPage} />
        <Route exact={true} path="/create" component={CreatePage} />
        <Route exact={true} path="/history" component={HistoryPage} />
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
