import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Exercise: "exercises",
  ExerciseReport: "exercise-reports",
  ExerciseSummary: "exercise-summaries",
  ExerciseTag: "exercise-tags",
  ExerciseVote: "exercise-votes",
  Submission: "submissions",
  SubmissionSummary: "submission-summaries",
  User: "users",
  UserAccount: "user-accounts",
  UserConfig: "user-config",
  UserSession: "user-sessions",
  UserSummary: "user-summaries"
};
