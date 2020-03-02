import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { AppDiaryPage } from "../pages/app-diary-entries/AppDiaryPage";
import { AppPage } from "../pages/app/AppPage";
import { CachePage } from "../pages/app/CachePage";
import { DependenciesPage } from "../pages/app/DependenciesPage";
import { HomePage } from "../pages/app/HomePage";
import { LoadingPage } from "../pages/app/LoadingPage";
import { NotFoundPage } from "../pages/app/NotFoundPage";
import { VersionPage } from "../pages/app/VersionPage";
import { CommunityPage } from "../pages/community/CommunityPage";
import { UserCommunityPage } from "../pages/community/UserCommunityPage";
import { UserFollowPage } from "../pages/community/UserFollowPage";
import { UserReportsPage } from "../pages/community/UserReportsPage";
import { UserSuggestionsPage } from "../pages/community/UserSuggestionsPage";
import { UserVotesPage } from "../pages/community/UserVotesPage";
import { ContestPage } from "../pages/contests/ContestPage";
import { EditContestPage } from "../pages/contests/EditContestPage";
import { EditContestsPage } from "../pages/contests/EditContestsPage";
import { GroupContestsPage } from "../pages/contests/GroupContestsPage";
import { ExerciseExerciseCommentsPage } from "../pages/exercise-comments/ExerciseExerciseCommentsPage";
import { ExerciseDiaryPage } from "../pages/exercise-diary-entries/ExerciseDiaryPage";
import { EditExerciseDraftsPage } from "../pages/exercise-drafts/EditExerciseDraftsPage";
import { UserExerciseDraftsPage } from "../pages/exercise-drafts/UserExerciseDraftsPage";
import { UserDownVotesPage } from "../pages/exercise-votes/UserDownVotesPage";
import { UserUpVotesPage } from "../pages/exercise-votes/UserUpVotesPage";
import { ExercisePage } from "../pages/exercises/ExercisePage";
import { ExercisesPage } from "../pages/exercises/ExercisesPage";
import { UserExercisesPage } from "../pages/exercises/UserExercisesPage";
import { GroupApplicationPage } from "../pages/group-applications/GroupApplicationPage";
import { GroupGroupApplicationsPage } from "../pages/group-applications/GroupGroupApplicationsPage";
import { UserGroupApplicationsPage } from "../pages/group-applications/UserGroupApplicationsPage";
import { GroupExercisesPage } from "../pages/group-exercises/GroupExercisesPage";
import { GroupGroupInvitationsPage } from "../pages/group-invitations/GroupGroupInvitationsPage";
import { GroupInvitePage } from "../pages/group-invitations/GroupInvitePage";
import { UserGroupInvitationsPage } from "../pages/group-invitations/UserGroupInvitationsPage";
import { GroupMembersPage } from "../pages/group-members/GroupMembersPage";
import { UserGroupsPage } from "../pages/group-members/UserGroupsPage";
import { GroupSecretPage } from "../pages/group-secrets/GroupSecretPage";
import { EditGroupPage } from "../pages/groups/EditGroupPage";
import { EditGroupsPage } from "../pages/groups/EditGroupsPage";
import { GroupPage } from "../pages/groups/GroupPage";
import { GroupsPage } from "../pages/groups/GroupsPage";
import { ObjectionObjectionCommentsPage } from "../pages/objection-comments/ObjectionObjectionCommentsPage";
import { EditObjectionPage } from "../pages/objections/EditObjectionPage";
import { EditObjectionsPage } from "../pages/objections/EditObjectionsPage";
import { ObjectionPage } from "../pages/objections/ObjectionPage";
import { ObjectionsPage } from "../pages/objections/ObjectionsPage";
import { UserObjectionsPage } from "../pages/objections/UserObjectionsPage";
import { UserPlaylistBookmarksPage } from "../pages/playlist-bookmarks/UserPlaylistBookmarksPage";
import { PlaylistDiaryPage } from "../pages/playlist-diary-entries/PlaylistDiaryPage";
import { EditPlaylistsPage } from "../pages/playlists/EditPlaylistsPage";
import { PlaylistPage } from "../pages/playlists/PlaylistPage";
import { PlaylistsPage } from "../pages/playlists/PlaylistsPage";
import { UserPlaylistsPage } from "../pages/playlists/UserPlaylistsPage";
import { ReportReportCommentsPage } from "../pages/report-comments/ReportReportCommentsPage";
import { EditReportPage } from "../pages/reports/EditReportPage";
import { EditReportsPage } from "../pages/reports/EditReportsPage";
import { ReportPage } from "../pages/reports/ReportPage";
import { ReportsPage } from "../pages/reports/ReportsPage";
import { UserReceivedReportsPage } from "../pages/reports/UserReceivedReportsPage";
import { UserUploadedReportsPage } from "../pages/reports/UserUploadedReportsPage";
import { EditRevisionPage } from "../pages/revisions/EditRevisionPage";
import { ExerciseRevisionsPage } from "../pages/revisions/ExerciseRevisionsPage";
import { RevisionPage } from "../pages/revisions/RevisionPage";
import { ReviewPage } from "../pages/submissions/ReviewPage";
import { SubmissionsPage } from "../pages/submissions/SubmissionsPage";
import { SuggestionSuggestionCommentsPage } from "../pages/suggestion-comments/SuggestionSuggestionCommentsPage";
import { EditSuggestionsPage } from "../pages/suggestions/EditSuggestionsPage";
import { SuggestionPage } from "../pages/suggestions/SuggestionPage";
import { UserReceivedSuggestionsPage } from "../pages/suggestions/UserReceivedSuggestionsPage";
import { UserUploadedSuggestionsPage } from "../pages/suggestions/UserUploadedSuggestionsPage";
import { SynonymPage } from "../pages/synonyms/SynonymPage";
import { SynonymsPage } from "../pages/synonyms/SynonymsPage";
import { TagSynonymsPage } from "../pages/synonyms/TagSynonymsPage";
import { TagDiaryPage } from "../pages/tag-diary-entries/TagDiaryPage";
import { FollowingTagsPage } from "../pages/tag-follows/FollowingTagsPage";
import { TagFollowersPage } from "../pages/tag-follows/TagFollowersPage";
import { EditTagPage } from "../pages/tags/EditTagPage";
import { EditTagsPage } from "../pages/tags/EditTagsPage";
import { TagPage } from "../pages/tags/TagPage";
import { TagsPage } from "../pages/tags/TagsPage";
import { EditUserAccountPage } from "../pages/user-accounts/EditUserAccountPage";
import { EditUserAccountProviderPage } from "../pages/user-accounts/EditUserAccountProviderPage";
import { UserAccountPage } from "../pages/user-accounts/UserAccountPage";
import { UserAccountProviderPage } from "../pages/user-accounts/UserAccountProviderPage";
import { EditUserConfigPage } from "../pages/user-configs/EditUserConfigPage";
import { UserDiaryPage } from "../pages/user-diary-entries/UserDiaryPage";
import { FollowingUsersPage } from "../pages/user-follows/FollowingUsersPage";
import { UserFollowersPage } from "../pages/user-follows/UserFollowersPage";
import { UserMessagesPage } from "../pages/user-messages/UserMessagesPage";
import { SecurityPage } from "../pages/user-sessions/SecurityPage";
import { UserSessionsPage } from "../pages/user-sessions/UserUserSessionsPage";
import { EditUserPage } from "../pages/users/EditUserPage";
import { UserPage } from "../pages/users/UserPage";
import { UsersPage } from "../pages/users/UsersPage";

export type PathParams = { id: string; name: string; secret: string };

const EditExerciseDraftPage = React.lazy(() => import("../pages/exercise-drafts/EditExerciseDraftPage"));
const EditPlaylistPage = React.lazy(() => import("../pages/playlists/EditPlaylistPage"));
const EditSuggestionPage = React.lazy(() => import("../pages/suggestions/EditSuggestionPage"));

export const Router = () => (
  <Suspense fallback={<LoadingPage />}>
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route exact path="/app" component={AppPage} />
      <Route exact path="/app/community" component={CommunityPage} />
      <Route exact path="/app/diary" component={AppDiaryPage} />
      <Route exact path="/app/version" component={VersionPage} />
      <Route exact path="/app/cache" component={CachePage} />
      <Route exact path="/app/dependencies" component={DependenciesPage} />

      <Route exact path="/user/account" component={UserAccountPage} />
      <Route exact path="/user/account/edit" component={EditUserAccountPage} />
      <Route exact path="/user/account/provider" component={UserAccountProviderPage} />
      <Route exact path="/user/account/provider/edit" component={EditUserAccountProviderPage} />
      <Route exact path="/user/security" component={SecurityPage} />
      <Route exact path="/user/security/sessions" component={UserSessionsPage} />
      <Route exact path="/user/config" component={EditUserConfigPage} />
      <Route exact path="/user/notifications/messages" component={UserMessagesPage} />
      <Route exact path="/user/notifications/invitations" component={UserGroupInvitationsPage} />
      <Route exact path="/user/submissions" component={SubmissionsPage} />
      <Route exact path="/user/submissions/review" component={ReviewPage} />
      <Route exact path="/user/drafts" component={UserExerciseDraftsPage} />

      <Route exact path="/users" component={UsersPage} />
      <Route exact path="/users/:id" component={UserPage} />
      <Route exact path="/users/:id/edit" component={EditUserPage} />
      <Route exact path="/users/:id/exercises" component={UserExercisesPage} />
      <Route exact path="/users/:id/playlists" component={UserPlaylistsPage} />
      <Route exact path="/users/:id/bookmarks" component={UserPlaylistBookmarksPage} />
      <Route exact path="/users/:id/community" component={UserCommunityPage} />
      <Route exact path="/users/:id/groups" component={UserGroupsPage} />
      <Route exact path="/users/:id/groups/applications" component={UserGroupApplicationsPage} />
      <Route exact path="/users/:id/votes" component={UserVotesPage} />
      <Route exact path="/users/:id/votes/up" component={UserUpVotesPage} />
      <Route exact path="/users/:id/votes/down" component={UserDownVotesPage} />
      <Route exact path="/users/:id/reports" component={UserReportsPage} />
      <Route exact path="/users/:id/reports/uploaded" component={UserUploadedReportsPage} />
      <Route exact path="/users/:id/reports/received" component={UserReceivedReportsPage} />
      <Route exact path="/users/:id/objections" component={UserObjectionsPage} />
      <Route exact path="/users/:id/suggestions" component={UserSuggestionsPage} />
      <Route exact path="/users/:id/suggestions/uploaded" component={UserUploadedSuggestionsPage} />
      <Route exact path="/users/:id/suggestions/received" component={UserReceivedSuggestionsPage} />
      <Route exact path="/users/:id/follow" component={UserFollowPage} />
      <Route exact path="/users/:id/followers" component={UserFollowersPage} />
      <Route exact path="/users/:id/following/users" component={FollowingUsersPage} />
      <Route exact path="/users/:id/following/tags" component={FollowingTagsPage} />
      <Route exact path="/users/:id/diary" component={UserDiaryPage} />

      <Route exact path="/exercises" component={ExercisesPage} />
      <Route exact path="/exercises/:id" component={ExercisePage} />
      <Route exact path="/exercises/:id/revisions" component={ExerciseRevisionsPage} />
      <Route exact path="/exercises/:id/comments" component={ExerciseExerciseCommentsPage} />
      <Route exact path="/exercises/:id/diary" component={ExerciseDiaryPage} />

      <Route exact path="/exercise-drafts/edit" component={EditExerciseDraftsPage} />
      <Route exact path="/exercise-drafts/:id/edit" component={EditExerciseDraftPage} />

      <Route exact path="/revisions/:id" component={RevisionPage} />
      <Route exact path="/revisions/:id/edit" component={EditRevisionPage} />

      <Route exact path="/suggestions/edit" component={EditSuggestionsPage} />
      <Route exact path="/suggestions/:id" component={SuggestionPage} />
      <Route exact path="/suggestions/:id/edit" component={EditSuggestionPage} />
      <Route exact path="/suggestions/:id/comments" component={SuggestionSuggestionCommentsPage} />

      <Route exact path="/playlists" component={PlaylistsPage} />
      <Route exact path="/playlists/edit" component={EditPlaylistsPage} />
      <Route exact path="/playlists/:id" component={PlaylistPage} />
      <Route exact path="/playlists/:id/edit" component={EditPlaylistPage} />
      <Route exact path="/playlists/:id/diary" component={PlaylistDiaryPage} />

      <Route exact path="/tags" component={TagsPage} />
      <Route exact path="/tags/edit" component={EditTagsPage} />
      <Route exact path="/tags/:name" component={TagPage} />
      <Route exact path="/tags/:name/synonyms" component={TagSynonymsPage} />
      <Route exact path="/tags/:id/edit" component={EditTagPage} />
      <Route exact path="/tags/:id/followers" component={TagFollowersPage} />
      <Route exact path="/tags/:id/diary" component={TagDiaryPage} />

      <Route exact path="/synonyms" component={SynonymsPage} />
      <Route exact path="/synonyms/:id" component={SynonymPage} />

      <Route exact path="/groups" component={GroupsPage} />
      <Route exact path="/groups/edit" component={EditGroupsPage} />
      <Route exact path="/groups/:id" component={GroupPage} />
      <Route exact path="/groups/:id/edit" component={EditGroupPage} />
      <Route exact path="/groups/:id/exercises" component={GroupExercisesPage} />
      <Route exact path="/groups/:id/contests" component={GroupContestsPage} />
      <Route exact path="/groups/:id/members" component={GroupMembersPage} />
      <Route exact path="/groups/:id/invite" component={GroupInvitePage} />
      <Route exact path="/groups/:id/invite/link" component={GroupSecretPage} />
      <Route exact path="/groups/:id/invite/:secret" component={GroupApplicationPage} />
      <Route exact path="/groups/:id/invitations" component={GroupGroupInvitationsPage} />
      <Route exact path="/groups/:id/applications" component={GroupGroupApplicationsPage} />

      <Route exact path="/contests/edit" component={EditContestsPage} />
      <Route exact path="/contests/:id" component={ContestPage} />
      <Route exact path="/contests/:id/edit" component={EditContestPage} />

      <Route exact path="/reports" component={ReportsPage} />
      <Route exact path="/reports/edit" component={EditReportsPage} />
      <Route exact path="/reports/:id" component={ReportPage} />
      <Route exact path="/reports/:id/edit" component={EditReportPage} />
      <Route exact path="/reports/:id/comments" component={ReportReportCommentsPage} />

      <Route exact path="/objections" component={ObjectionsPage} />
      <Route exact path="/objections/edit" component={EditObjectionsPage} />
      <Route exact path="/objections/:id" component={ObjectionPage} />
      <Route exact path="/objections/:id/edit" component={EditObjectionPage} />
      <Route exact path="/objections/:id/comments" component={ObjectionObjectionCommentsPage} />

      <Route component={NotFoundPage} />
    </Switch>
  </Suspense>
);
