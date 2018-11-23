import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  User: "users",
  UserAccount: "user-accounts",
  UserSession: "user-sessions"
};
