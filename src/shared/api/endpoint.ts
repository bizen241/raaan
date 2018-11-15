import { EntityType } from "./entities";

export const endpoints: { [P in EntityType]: string } = {
  Account: "accounts",
  Session: "sessions",
  User: "users"
};
