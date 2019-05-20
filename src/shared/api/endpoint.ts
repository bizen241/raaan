import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Exercise: "exercises",
  ExerciseDetail: "exercise-details",
  ExerciseRevision: "exercise-revisions",
  ExerciseRevisionDetail: "exercise-revision-details",
  ExerciseSummary: "exercise-summaries",
  ExerciseTag: "exercise-tags",
  User: "users",
  UserAccount: "user-accounts",
  UserConfig: "user-config",
  UserSession: "user-sessions"
};
