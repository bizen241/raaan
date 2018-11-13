import { Account, EntityObject, Session, User } from "../entities";

export interface EntityMap<E extends EntityObject> {
  [id: string]: E | undefined;
}

export interface EntityStore {
  Account: EntityMap<Account>;
  Session: EntityMap<Session>;
  User: EntityMap<User>;
}

export const createEntityStore = (): EntityStore => ({
  Account: {},
  Session: {},
  User: {}
});
