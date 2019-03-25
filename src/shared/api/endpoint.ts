import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Content: "contents",
  ExerciseDetail: "content-details",
  ExerciseRevision: "content-revisions",
  ExerciseTag: "content-tags",
  User: "users",
  UserAccount: "user-accounts",
  UserConfig: "user-config",
  UserSession: "user-sessions"
};
