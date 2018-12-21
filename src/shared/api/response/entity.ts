import { Content, ContentRevision, ContentTag, EntityObject, User, UserAccount, UserSession } from "../entities";

export interface EntityMap<E extends EntityObject> {
  [id: string]: E | undefined;
}

export interface EntityStore {
  Content: EntityMap<Content>;
  ContentRevision: EntityMap<ContentRevision>;
  ContentTag: EntityMap<ContentTag>;
  User: EntityMap<User>;
  UserAccount: EntityMap<UserAccount>;
  UserSession: EntityMap<UserSession>;
}

export const createEntityStore = (): EntityStore => ({
  Content: {},
  ContentRevision: {},
  ContentTag: {},
  User: {},
  UserAccount: {},
  UserSession: {}
});
