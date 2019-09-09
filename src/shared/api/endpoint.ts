import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Exercise: "exercises",
  ExerciseDiary: "exercise-diaries",
  ExerciseReport: "exercise-reports",
  ExerciseSummary: "exercise-summaries",
  ExerciseTag: "exercise-tags",
  ExerciseVote: "exercise-votes",
  Playlist: "playlists",
  PlaylistBookmark: "playlist-bookmarks",
  PlaylistItem: "playlist-items",
  PlaylistReport: "playlist-reports",
  PlaylistSummary: "playlist-summaries",
  PlaylistTag: "playlist-tags",
  Submission: "submissions",
  SubmissionSummary: "submission-summaries",
  User: "users",
  UserDiary: "user-diaries",
  UserAccount: "user-accounts",
  UserConfig: "user-config",
  UserReport: "user-reports",
  UserSession: "user-sessions",
  UserSummary: "user-summaries"
};
