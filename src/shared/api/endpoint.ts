import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Exercise: "exercises",
  ExerciseSummary: "exercise-summaries",
  ExerciseTag: "exercise-tags",
  Submission: "submissions",
  SubmissionSummary: "submission-summaries",
  User: "users",
  UserAccount: "user-accounts",
  UserConfig: "user-config",
  UserSession: "user-sessions",
  UserSummary: "user-summaries"
};
