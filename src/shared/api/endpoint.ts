import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Content: "contents",
  ContentRevision: "content-revisions",
  ContentTag: "content-tags",
  User: "users",
  UserAccount: "user-accounts",
  UserSession: "user-sessions"
};
