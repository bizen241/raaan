import * as React from "react";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { RootState } from "../../reducers";
import { AppPage } from "../pages/AppPage";
import { CommunityPage } from "../pages/community/CommunityPage";
import { ObjectionsHomePage } from "../pages/community/ObjectionsHomePage";
import { ReportsHomePage } from "../pages/community/ReportsHomePage";
import { UserCommunityPage } from "../pages/community/UserCommunityPage";
import { UserFollowsHomePage } from "../pages/community/UserFollowsHomePage";
import { UserObjectionsHomePage } from "../pages/community/UserObjectionsHomePage";
import { UserReportsHomePage } from "../pages/community/UserReportsHomePage";
import { UserExerciseDraftsPage } from "../pages/exercise-drafts/UserExerciseDraftsPage";
import { ExerciseObjectionsPage } from "../pages/exercise-objections/ExerciseObjectionsPage";
import { EditExerciseReportPage } from "../pages/exercise-reports/EditExerciseReportPage";
import { ExerciseReportPage } from "../pages/exercise-reports/ExerciseReportPage";
import { ExerciseReportsPage } from "../pages/exercise-reports/ExerciseReportsPage";
import { UserExerciseReportsPage } from "../pages/exercise-reports/UserExerciseReportsPage";
import { EditExercisesPage } from "../pages/exercises/EditExercisesPage";
import { ExercisePage } from "../pages/exercises/ExercisePage";
import { ExercisesPage } from "../pages/exercises/ExercisesPage";
import { UserExercisesPage } from "../pages/exercises/UserExercisesPage";
import { GroupGroupExercisesPage } from "../pages/group-exercises/GroupGroupExercisesPage";
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
import { ExerciseRevisionsPage } from "../pages/revisions/ExerciseRevisionsPage";
import { RevisionPage } from "../pages/revisions/RevisionPage";
import { UserSubmissionsPage } from "../pages/submissions/UserSubmissionsPage";
import { SynonymPage } from "../pages/synonyms/SynonymPage";
import { SynonymsPage } from "../pages/synonyms/SynonymsPage";
import { TagSynonymsPage } from "../pages/synonyms/TagSynonymsPage";
import { TagFollowersPage } from "../pages/tag-follows/TagFollowersPage";
import { UserTagFollowsPage } from "../pages/tag-follows/UserTagFollowsPage";
import { EditTagPage } from "../pages/tags/EditTagPage";
import { EditTagsPage } from "../pages/tags/EditTagsPage";
import { TagPage } from "../pages/tags/TagPage";
import { TagsPage } from "../pages/tags/TagsPage";
import { UserUserAccountsPage } from "../pages/user-accounts/UserUserAccountsPage";
import { UserUserConfigPage } from "../pages/user-configs/UserUserConfigPage";
import { UserFollowersPage } from "../pages/user-follows/UserFollowersPage";
import { UserUserFollowsPage } from "../pages/user-follows/UserUserFollowsPage";
import { UserUserSessionsPage } from "../pages/user-sessions/UserUserSessionsPage";
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

        <Route exact={true} path="/community" component={CommunityPage} />
        <Route exact={true} path="/reports" component={ReportsHomePage} />
        <Route exact={true} path="/objections" component={ObjectionsHomePage} />

        <Route exact={true} path="/user/user-config" component={UserUserConfigPage} />
        <Route exact={true} path="/user/user-accounts" component={UserUserAccountsPage} />
        <Route exact={true} path="/user/user-sessions" component={UserUserSessionsPage} />

        <Route exact={true} path="/user/submissions" component={UserSubmissionsPage} />
        <Route exact={true} path="/user/exercise-drafts" component={UserExerciseDraftsPage} />

        <Route exact={true} path="/users" component={UsersPage} />
        <Route exact={true} path="/users/:id" component={UserPage} />
        <Route exact={true} path="/users/:id/edit" component={EditUserPage} />

        <Route exact={true} path="/users/:id/exercises" component={UserExercisesPage} />
        <Route exact={true} path="/users/:id/playlists" component={UserPlaylistsPage} />
        <Route exact={true} path="/users/:id/playlist-bookmarks" component={UserPlaylistBookmarksPage} />

        <Route exact={true} path="/users/:id/community" component={UserCommunityPage} />

        <Route exact={true} path="/users/:id/group-members" component={UserGroupMembersPage} />

        <Route exact={true} path="/users/:id/follows" component={UserFollowsHomePage} />
        <Route exact={true} path="/users/:id/followers" component={UserFollowersPage} />
        <Route exact={true} path="/users/:id/user-follows" component={UserUserFollowsPage} />
        <Route exact={true} path="/users/:id/tag-follows" component={UserTagFollowsPage} />

        <Route exact={true} path="/users/:id/reports" component={UserReportsHomePage} />
        <Route exact={true} path="/users/:id/exercise-reports" component={UserExerciseReportsPage} />

        <Route exact={true} path="/users/:id/objections" component={UserObjectionsHomePage} />
        <Route exact={true} path="/users/:id/exercise-objections" component={NotFoundPage} />

        <Route exact={true} path="/exercises" component={ExercisesPage} />
        <Route exact={true} path="/exercises/edit" component={EditExercisesPage} />
        <Route exact={true} path="/exercises/:id" component={ExercisePage} />
        <Route exact={true} path="/exercises/:id/edit" component={EditExercisePage} />
        <Route exact={true} path="/exercises/:id/revisions" component={ExerciseRevisionsPage} />
        <Route exact={true} path="/exercises/:id/exercise-reports" component={NotFoundPage} />

        <Route exact={true} path="/revisions/:id" component={RevisionPage} />

        <Route exact={true} path="/playlists" component={PlaylistsPage} />
        <Route exact={true} path="/playlists/edit" component={EditUserPage} />
        <Route exact={true} path="/playlists/:id" component={PlaylistPage} />
        <Route exact={true} path="/playlists/:id/edit" component={EditPlaylistPage} />

        <Route exact={true} path="/tags" component={TagsPage} />
        <Route exact={true} path="/tags/edit" component={EditTagsPage} />
        <Route exact={true} path="/tags/:name" component={TagPage} />
        <Route exact={true} path="/tags/:id/edit" component={EditTagPage} />
        <Route exact={true} path="/tags/:name/synonyms" component={TagSynonymsPage} />
        <Route exact={true} path="/tags/:id/followers" component={TagFollowersPage} />

        <Route exact={true} path="/synonyms" component={SynonymsPage} />
        <Route exact={true} path="/synonyms/:id" component={SynonymPage} />

        <Route exact={true} path="/groups" component={GroupsPage} />
        <Route exact={true} path="/groups/edit" component={EditGroupsPage} />
        <Route exact={true} path="/groups/:id" component={GroupPage} />
        <Route exact={true} path="/groups/:id/edit" component={EditGroupPage} />
        <Route exact={true} path="/groups/:id/group-exercises" component={GroupGroupExercisesPage} />

        <Route exact={true} path="/exercise-reports" component={ExerciseReportsPage} />
        <Route exact={true} path="/exercise-reports/edit" component={EditExerciseReportPage} />
        <Route exact={true} path="/exercise-reports/:id" component={ExerciseReportPage} />
        <Route exact={true} path="/exercise-reports/:id/edit" component={EditExerciseReportPage} />

        <Route exact={true} path="/exercise-objections" component={ExerciseObjectionsPage} />
        <Route exact={true} path="/exercise-objections/edit" component={NotFoundPage} />
        <Route exact={true} path="/exercise-objections/:id" component={NotFoundPage} />
        <Route exact={true} path="/exercise-objections/:id/edit" component={NotFoundPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
});
