import * as React from "react";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { RootState } from "../../reducers";
import { AppPage } from "../pages/AppPage";
import { CommunityPage } from "../pages/community/CommunityPage";
import { GroupInvitePage } from "../pages/community/GroupInvitePage";
import { UserCommunityPage } from "../pages/community/UserCommunityPage";
import { UserFollowingPage } from "../pages/community/UserFollowsHomePage";
import { ContestPage } from "../pages/contests/ContestPage";
import { EditContestPage } from "../pages/contests/EditContestPage";
import { EditContestsPage } from "../pages/contests/EditContestsPage";
import { GroupContestsPage } from "../pages/contests/GroupContestsPage";
import { DraftsPage } from "../pages/exercise-drafts/UserExerciseDraftsPage";
import { EditExercisesPage } from "../pages/exercises/EditExercisesPage";
import { ExercisePage } from "../pages/exercises/ExercisePage";
import { ExercisesPage } from "../pages/exercises/ExercisesPage";
import { UserExercisesPage } from "../pages/exercises/UserExercisesPage";
import { GroupApplicationPage } from "../pages/group-applications/GroupApplicationPage";
import { GroupGroupApplicationsPage } from "../pages/group-applications/GroupGroupApplicationsPage";
import { GroupExercisesPage } from "../pages/group-exercises/GroupGroupExercisesPage";
import { GroupGroupInvitationsPage } from "../pages/group-invitations/GroupGroupInvitationsPage";
import { UserGroupInvitationsPage } from "../pages/group-invitations/UserGroupInvitationsPage";
import { GroupMembersPage } from "../pages/group-members/GroupGroupMembersPage";
import { UserGroupsPage } from "../pages/group-members/UserGroupMembersPage";
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
import { SubmissionsPage } from "../pages/submissions/UserSubmissionsPage";
import { SynonymPage } from "../pages/synonyms/SynonymPage";
import { SynonymsPage } from "../pages/synonyms/SynonymsPage";
import { TagSynonymsPage } from "../pages/synonyms/TagSynonymsPage";
import { TagFollowersPage } from "../pages/tag-follows/TagFollowersPage";
import { TagFollowsPage } from "../pages/tag-follows/UserTagFollowsPage";
import { EditTagPage } from "../pages/tags/EditTagPage";
import { EditTagsPage } from "../pages/tags/EditTagsPage";
import { TagPage } from "../pages/tags/TagPage";
import { TagsPage } from "../pages/tags/TagsPage";
import { EditUserAccountPage } from "../pages/user-accounts/EditUserAccountPage";
import { EditAccountProviderPage } from "../pages/user-accounts/EditUserAccountProviderPage";
import { AccountProviderPage } from "../pages/user-accounts/UserUserAccountPage";
import { EditUserConfigPage } from "../pages/user-configs/UserUserConfigPage";
import { UserFollowersPage } from "../pages/user-follows/UserFollowersPage";
import { UserFollowsPage } from "../pages/user-follows/UserUserFollowsPage";
import { UserMessagesPage } from "../pages/user-messages/UserUserMessagesPage";
import { UserSessionsPage } from "../pages/user-sessions/UserUserSessionsPage";
import { UserAccountPage } from "../pages/user/UserUserPage";
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
        <Route exact={true} path="/app/version" component={VersionPage} />

        <Route exact={true} path="/user/account" component={UserAccountPage} />
        <Route exact={true} path="/user/account/edit" component={EditUserAccountPage} />
        <Route exact={true} path="/user/account/provider" component={AccountProviderPage} />
        <Route exact={true} path="/user/account/provider/edit" component={EditAccountProviderPage} />
        <Route exact={true} path="/user/security" component={SecurityPage} />
        <Route exact={true} path="/user/security/sessions" component={UserSessionsPage} />
        <Route exact={true} path="/user/config" component={EditUserConfigPage} />
        <Route exact={true} path="/user/notifications/messages" component={UserMessagesPage} />
        <Route exact={true} path="/user/notifications/invitations" component={UserGroupInvitationsPage} />
        <Route exact={true} path="/user/submissions" component={SubmissionsPage} />
        <Route exact={true} path="/user/submissions/review" component={ReviewPage} />
        <Route exact={true} path="/user/drafts" component={DraftsPage} />

        <Route exact={true} path="/users" component={UsersPage} />
        <Route exact={true} path="/users/:id" component={UserPage} />
        <Route exact={true} path="/users/:id/edit" component={EditUserPage} />
        <Route exact={true} path="/users/:id/contents/exercises" component={UserExercisesPage} />
        <Route exact={true} path="/users/:id/contents/playlists" component={UserPlaylistsPage} />
        <Route exact={true} path="/users/:id/contents/bookmarks" component={UserPlaylistBookmarksPage} />
        <Route exact={true} path="/users/:id/community" component={UserCommunityPage} />
        <Route exact={true} path="/users/:id/community/groups" component={UserGroupsPage} />
        <Route exact={true} path="/users/:id/community/groups/applications" component={NotFoundPage} />
        <Route exact={true} path="/users/:id/community/votes" component={NotFoundPage} />
        <Route exact={true} path="/users/:id/community/votes/up" component={NotFoundPage} />
        <Route exact={true} path="/users/:id/community/votes/down" component={NotFoundPage} />
        <Route exact={true} path="/users/:id/community/reports" component={NotFoundPage} />
        <Route exact={true} path="/users/:id/community/reporters" component={NotFoundPage} />
        <Route exact={true} path="/users/:id/community/objections" component={NotFoundPage} />
        <Route exact={true} path="/users/:id/community/follows" component={UserFollowingPage} />
        <Route exact={true} path="/users/:id/community/follows/followers" component={UserFollowersPage} />
        <Route exact={true} path="/users/:id/community/follows/users" component={UserFollowsPage} />
        <Route exact={true} path="/users/:id/community/follows/tags" component={TagFollowsPage} />

        <Route exact={true} path="/exercises" component={ExercisesPage} />
        <Route exact={true} path="/exercises/edit" component={EditExercisesPage} />
        <Route exact={true} path="/exercises/:id" component={ExercisePage} />
        <Route exact={true} path="/exercises/:id/edit" component={EditExercisePage} />
        <Route exact={true} path="/exercises/:id/revisions" component={ExerciseRevisionsPage} />

        <Route exact={true} path="/revisions/:id" component={RevisionPage} />

        <Route exact={true} path="/playlists" component={PlaylistsPage} />
        <Route exact={true} path="/playlists/edit" component={NotFoundPage} />
        <Route exact={true} path="/playlists/:id" component={PlaylistPage} />
        <Route exact={true} path="/playlists/:id/edit" component={EditPlaylistPage} />

        <Route exact={true} path="/tags" component={TagsPage} />
        <Route exact={true} path="/tags/edit" component={EditTagsPage} />
        <Route exact={true} path="/tags/:name" component={TagPage} />
        <Route exact={true} path="/tags/:name/synonyms" component={TagSynonymsPage} />
        <Route exact={true} path="/tags/:id/edit" component={EditTagPage} />
        <Route exact={true} path="/tags/:id/followers" component={TagFollowersPage} />

        <Route exact={true} path="/synonyms" component={SynonymsPage} />
        <Route exact={true} path="/synonyms/:id" component={SynonymPage} />

        <Route exact={true} path="/groups" component={GroupsPage} />
        <Route exact={true} path="/groups/edit" component={EditGroupsPage} />
        <Route exact={true} path="/groups/:id" component={GroupPage} />
        <Route exact={true} path="/groups/:id/edit" component={EditGroupPage} />
        <Route exact={true} path="/groups/:id/contents/exercises" component={GroupExercisesPage} />
        <Route exact={true} path="/groups/:id/contents/contests" component={GroupContestsPage} />
        <Route exact={true} path="/groups/:id/members" component={GroupMembersPage} />
        <Route exact={true} path="/groups/:id/members/invite" component={GroupInvitePage} />
        <Route exact={true} path="/groups/:id/members/invite/secret" component={GroupSecretPage} />
        <Route exact={true} path="/groups/:id/members/invite/:secret" component={GroupApplicationPage} />
        <Route exact={true} path="/groups/:id/members/invitations" component={GroupGroupInvitationsPage} />
        <Route exact={true} path="/groups/:id/members/applications" component={GroupGroupApplicationsPage} />

        <Route exact={true} path="/contests/edit" component={EditContestsPage} />
        <Route exact={true} path="/contests/:id" component={ContestPage} />
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
