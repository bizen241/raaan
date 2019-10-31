import * as React from "react";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { RootState } from "../../reducers";
import { AppPage } from "../pages/AppPage";
import { EditExercisesPage } from "../pages/exercises/EditExercisesPage";
import { ExercisePage } from "../pages/exercises/ExercisePage";
import { ExercisesPage } from "../pages/exercises/ExercisesPage";
import { UserExerciseDraftsPage } from "../pages/exercises/UserExerciseDraftsPage";
import { UserExercisesPage } from "../pages/exercises/UserExercisesPage";
import { GroupExercisesPage } from "../pages/group-exercises/GroupExercisesPage";
import { UserGroupMembersPage } from "../pages/group-members/UserGroupMembersPage";
import { EditGroupPage } from "../pages/groups/EditGroupPage";
import { EditGroupsPage } from "../pages/groups/EditGroupsPage";
import { GroupPage } from "../pages/groups/GroupPage";
import { GroupsPage } from "../pages/groups/GroupsPage";
import { HomePage } from "../pages/HomePage";
import { LoadingPage } from "../pages/LoadingPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { UserPlaylistBookmarksPage } from "../pages/playlist-bookmarks/UserPlaylistBookmarksPage";
import { PlaylistPage } from "../pages/playlists/PlaylistPage";
import { PlaylistsPage } from "../pages/playlists/PlaylistsPage";
import { UserPlaylistsPage } from "../pages/playlists/UserPlaylistsPage";
import { EditExerciseReportPage } from "../pages/reports/EditExerciseReportPage";
import { UserSubmissionsPage } from "../pages/submissions/UserSubmissionsPage";
import { EditTagsPage } from "../pages/tags/EditTagsPage";
import { TagPage } from "../pages/tags/TagPage";
import { TagsPage } from "../pages/tags/TagsPage";
import { UserAccountsPage } from "../pages/user/UserAccountsPage";
import { UserConfigPage } from "../pages/user/UserConfigPage";
import { UserSessionsPage } from "../pages/user/UserSessionsPage";
import { EditUserPage } from "../pages/users/EditUserPage";
import { UserPage } from "../pages/users/UserPage";
import { UsersPage } from "../pages/users/UsersPage";

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

        <Route exact={true} path="/user/user-config" component={UserConfigPage} />
        <Route exact={true} path="/user/user-accounts" component={UserAccountsPage} />
        <Route exact={true} path="/user/user-sessions" component={UserSessionsPage} />

        <Route exact={true} path="/user/submissions" component={UserSubmissionsPage} />
        <Route exact={true} path="/user/exercise-drafts" component={UserExerciseDraftsPage} />

        <Route exact={true} path="/users" component={UsersPage} />
        <Route exact={true} path="/users/:id" component={UserPage} />
        <Route exact={true} path="/users/:id/edit" component={EditUserPage} />
        <Route exact={true} path="/users/:id/exercises" component={UserExercisesPage} />
        <Route exact={true} path="/users/:id/playlists" component={UserPlaylistsPage} />
        <Route exact={true} path="/users/:id/playlist-bookmarks" component={UserPlaylistBookmarksPage} />
        <Route exact={true} path="/users/:id/group-members" component={UserGroupMembersPage} />

        <Route exact={true} path="/exercises" component={ExercisesPage} />
        <Route exact={true} path="/exercises/edit" component={EditExercisesPage} />
        <Route exact={true} path="/exercises/:id" component={ExercisePage} />
        <Route exact={true} path="/exercises/:id/edit" component={EditExercisePage} />

        <Route exact={true} path="/playlists" component={PlaylistsPage} />
        <Route exact={true} path="/playlists/edit" component={EditUserPage} />
        <Route exact={true} path="/playlists/:id" component={PlaylistPage} />
        <Route exact={true} path="/playlists/:id/edit" component={EditPlaylistPage} />

        <Route exact={true} path="/tags" component={TagsPage} />
        <Route exact={true} path="/tags/edit" component={EditTagsPage} />
        <Route exact={true} path="/tags/:name" component={TagPage} />
        <Route exact={true} path="/tags/:name/edit" component={NotFoundPage} />

        <Route exact={true} path="/groups" component={GroupsPage} />
        <Route exact={true} path="/groups/edit" component={EditGroupsPage} />
        <Route exact={true} path="/groups/:id" component={GroupPage} />
        <Route exact={true} path="/groups/:id/edit" component={EditGroupPage} />
        <Route exact={true} path="/groups/:id/group-exercises" component={GroupExercisesPage} />

        <Route exact={true} path="/exercise-reports" component={NotFoundPage} />
        <Route exact={true} path="/exercise-reports/edit" component={NotFoundPage} />
        <Route exact={true} path="/exercise-reports/:id" component={NotFoundPage} />
        <Route exact={true} path="/exercise-reports/:id/edit" component={EditExerciseReportPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
});
