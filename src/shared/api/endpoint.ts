import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Content: "contents",
  ContentRevision: "content-revisions",
  ContentObject: "content-objects",
  ContentTag: "content-tags",
  User: "users",
  UserAccount: "user-accounts",
  UserSession: "user-sessions"
};
