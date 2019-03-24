import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Content: "contents",
  ContentDetail: "content-details",
  ContentRevision: "content-revisions",
  ContentTag: "content-tags",
  User: "users",
  UserAccount: "user-accounts",
  UserConfig: "user-config",
  UserSession: "user-sessions"
};
