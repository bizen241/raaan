import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Exercise: "exercises",
  ExerciseDiary: "exercise-diaries",
  ExerciseDraft: "exercise-drafts",
  ExerciseReport: "exercise-reports",
  ExerciseSummary: "exercise-summaries",
  ExerciseVote: "exercise-votes",
  Playlist: "playlists",
  PlaylistBookmark: "playlist-bookmarks",
  PlaylistItem: "playlist-items",
  PlaylistReport: "playlist-reports",
  PlaylistSummary: "playlist-summaries",
  Revision: "revisions",
  RevisionSummary: "revision-summaries",
  Submission: "submissions",
  SubmissionSummary: "submission-summaries",
  Tag: "tags",
  TagSummary: "tag-summaries",
  User: "users",
  UserDiary: "user-diaries",
  UserAccount: "user-accounts",
  UserConfig: "user-configs",
  UserReport: "user-reports",
  UserSession: "user-sessions",
  UserSummary: "user-summaries"
};
