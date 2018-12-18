import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Content: "contents",
  ContentRevision: "content-revisions",
  User: "users",
  UserAccount: "user-accounts",
  UserSession: "user-sessions"
};
