import { EntityObject } from "..";
import { Account } from "../Account";
import { Session } from "../Session";
import { User } from "../User";

export * from "./create";

export interface EntityMap<E extends EntityObject> {
  [id: string]: E | undefined;
}

export interface EntityStore {
  Account: EntityMap<Account>;
  Session: EntityMap<Session>;
  User: EntityMap<User>;
}
