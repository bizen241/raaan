import { EntityObject, User, UserAccount, UserSession } from "../entities";

export interface EntityMap<E extends EntityObject> {
  [id: string]: E | undefined;
}

export interface EntityStore {
  User: EntityMap<User>;
  UserAccount: EntityMap<UserAccount>;
  UserSession: EntityMap<UserSession>;
}

export const createEntityStore = (): EntityStore => ({
  User: {},
  UserAccount: {},
  UserSession: {}
});
