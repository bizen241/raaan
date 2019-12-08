import * as React from "react";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { RootState } from "../../reducers";
import { AppPage } from "../pages/AppPage";
import { CommunityPage } from "../pages/community/CommunityPage";
import { GroupInvitePage } from "../pages/community/GroupInvitePage";
import { UserCommunityPage } from "../pages/community/UserCommunityPage";
import { UserFollowsHomePage } from "../pages/community/UserFollowsHomePage";
import { ContestPage } from "../pages/contests/ContestPage";
import { EditContestPage } from "../pages/contests/EditContestPage";
import { EditContestsPage } from "../pages/contests/EditContestsPage";
import { GroupContestsPage } from "../pages/contests/GroupContestsPage";
import { UserExerciseDraftsPage } from "../pages/exercise-drafts/UserExerciseDraftsPage";
import { EditExercisesPage } from "../pages/exercises/EditExercisesPage";
import { ExercisePage } from "../pages/exercises/ExercisePage";
import { ExercisesPage } from "../pages/exercises/ExercisesPage";
import { UserExercisesPage } from "../pages/exercises/UserExercisesPage";
import { GroupApplicationPage } from "../pages/group-applications/GroupApplicationPage";
import { GroupGroupApplicationsPage } from "../pages/group-applications/GroupGroupApplicationsPage";
import { GroupGroupExercisesPage } from "../pages/group-exercises/GroupGroupExercisesPage";
import { GroupGroupInvitationsPage } from "../pages/group-invitations/GroupGroupInvitationsPage";
import { UserGroupInvitationsPage } from "../pages/group-invitations/UserGroupInvitationsPage";
import { GroupGroupMembersPage } from "../pages/group-members/GroupGroupMembersPage";
import { UserGroupMembersPage } from "../pages/group-members/UserGroupMembersPage";
import { GroupSecretPage } from "../pages/group-secrets/GroupSecretPage";
import { EditGroupPage } from "../pages/groups/EditGroupPage";
import { EditGroupsPage } from "../pages/groups/EditGroupsPage";
import { GroupPage } from "../pages/groups/GroupPage";
import { GroupsPage } from "../pages/groups/GroupsPage";
import { HomePage } from "../pages/HomePage";
import { LoadingPage } from "../pages/LoadingPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { EditObjectionPage } from "../pages/objections/EditObjectionPage";
import { EditObjectionsPage } from "../pages/objections/EditObjectionsPage";
import { ObjectionPage } from "../pages/objections/ObjectionPage";
import { ObjectionsPage } from "../pages/objections/ObjectionsPage";
import { UserPlaylistBookmarksPage } from "../pages/playlist-bookmarks/UserPlaylistBookmarksPage";
import { PlaylistPage } from "../pages/playlists/PlaylistPage";
import { PlaylistsPage } from "../pages/playlists/PlaylistsPage";
import { UserPlaylistsPage } from "../pages/playlists/UserPlaylistsPage";
import { EditReportPage } from "../pages/reports/EditReportPage";
import { EditReportsPage } from "../pages/reports/EditReportsPage";
import { ReportPage } from "../pages/reports/ReportPage";
import { ReportsPage } from "../pages/reports/ReportsPage";
import { ExerciseRevisionsPage } from "../pages/revisions/ExerciseRevisionsPage";
import { RevisionPage } from "../pages/revisions/RevisionPage";
import { SecurityPage } from "../pages/SecurityPage";
import { ReviewPage } from "../pages/submissions/ReviewPage";
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
import { EditUserAccountPage } from "../pages/user-accounts/EditUserAccountPage";
import { EditUserAccountProviderPage } from "../pages/user-accounts/EditUserAccountProviderPage";
import { UserUserAccountPage } from "../pages/user-accounts/UserUserAccountPage";
import { UserUserConfigPage } from "../pages/user-configs/UserUserConfigPage";
import { UserFollowersPage } from "../pages/user-follows/UserFollowersPage";
import { UserUserFollowsPage } from "../pages/user-follows/UserUserFollowsPage";
import { UserUserMessagesPage } from "../pages/user-messages/UserUserMessagesPage";
import { UserUserSessionsPage } from "../pages/user-sessions/UserUserSessionsPage";
import { AccountPage } from "../pages/user/UserUserPage";
import { EditUserPage } from "../pages/users/EditUserPage";
import { UserPage } from "../pages/users/UserPage";
import { UsersPage } from "../pages/users/UsersPage";
import { VersionPage } from "../pages/VersionPage";

export type PageProps = RouteComponentProps<{ id: string; name: string; secret: string }>;

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
        <Route exact={true} path="/app/community" component={CommunityPage} />
        <Route exact={true} path="/app/account" component={AccountPage} />
        <Route exact={true} path="/app/security" component={SecurityPage} />
        <Route exact={true} path="/app/version" component={VersionPage} />

        <Route exact={true} path="/user-summaries" component={UsersPage} />

        <Route exact={true} path="/users/:id" component={UserPage} />
        <Route exact={true} path="/users/:id/edit" component={EditUserPage} />

        <Route exact={true} path="/user-accounts/:id" component={UserUserAccountPage} />
        <Route exact={true} path="/user-accounts/:id/edit" component={EditUserAccountPage} />
        <Route exact={true} path="/user-accounts/:id/provider" component={EditUserAccountProviderPage} />

        <Route exact={true} path="/user-sessions" component={UserUserSessionsPage} />

        <Route exact={true} path="/user/user-config" component={UserUserConfigPage} />

        <Route exact={true} path="/user/user-messages" component={UserUserMessagesPage} />
        <Route exact={true} path="/user/group-invitations" component={UserGroupInvitationsPage} />

        <Route exact={true} path="/user/exercise-drafts" component={UserExerciseDraftsPage} />
        <Route exact={true} path="/user/submissions" component={UserSubmissionsPage} />
        <Route exact={true} path="/user/submissions/review" component={ReviewPage} />

        <Route exact={true} path="/users/:id/exercises" component={UserExercisesPage} />
        <Route exact={true} path="/users/:id/playlists" component={UserPlaylistsPage} />
        <Route exact={true} path="/users/:id/playlist-bookmarks" component={UserPlaylistBookmarksPage} />

        <Route exact={true} path="/users/:id/community" component={UserCommunityPage} />

        <Route exact={true} path="/users/:id/group-members" component={UserGroupMembersPage} />

        <Route exact={true} path="/users/:id/follows" component={UserFollowsHomePage} />
        <Route exact={true} path="/users/:id/followers" component={UserFollowersPage} />
        <Route exact={true} path="/users/:id/user-follows" component={UserUserFollowsPage} />
        <Route exact={true} path="/users/:id/tag-follows" component={UserTagFollowsPage} />

        <Route exact={true} path="/exercises" component={ExercisesPage} />
        <Route exact={true} path="/exercises/edit" component={EditExercisesPage} />
        <Route exact={true} path="/exercises/:id" component={ExercisePage} />
        <Route exact={true} path="/exercises/:id/edit" component={EditExercisePage} />
        <Route exact={true} path="/exercises/:id/revisions" component={ExerciseRevisionsPage} />

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
        <Route exact={true} path="/groups/:id/group-members" component={GroupGroupMembersPage} />
        <Route exact={true} path="/groups/:id/contests" component={GroupContestsPage} />

        <Route exact={true} path="/groups/:id/invite" component={GroupInvitePage} />
        <Route exact={true} path="/groups/:id/invite/:secret" component={GroupApplicationPage} />
        <Route exact={true} path="/groups/:id/group-secret" component={GroupSecretPage} />
        <Route exact={true} path="/groups/:id/group-invitations" component={GroupGroupInvitationsPage} />
        <Route exact={true} path="/groups/:id/group-applications" component={GroupGroupApplicationsPage} />

        <Route exact={true} path="/contests/edit" component={EditContestsPage} />
        <Route exact={true} path="/contests/:id/" component={ContestPage} />
        <Route exact={true} path="/contests/:id/edit" component={EditContestPage} />

        <Route exact={true} path="/reports" component={ReportsPage} />
        <Route exact={true} path="/reports/edit" component={EditReportsPage} />
        <Route exact={true} path="/reports/:id" component={ReportPage} />
        <Route exact={true} path="/reports/:id/edit" component={EditReportPage} />

        <Route exact={true} path="/objections" component={ObjectionsPage} />
        <Route exact={true} path="/objections/edit" component={EditObjectionsPage} />
        <Route exact={true} path="/objections/:id" component={ObjectionPage} />
        <Route exact={true} path="/objections/:id/edit" component={EditObjectionPage} />

        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
});
