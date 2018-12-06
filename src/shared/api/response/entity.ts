import { Content, ContentBranch, ContentRevision, EntityObject, User, UserAccount, UserSession } from "../entities";

export interface EntityMap<E extends EntityObject> {
  [id: string]: E | undefined;
}

export interface EntityStore {
  Content: EntityMap<Content>;
  ContentBranch: EntityMap<ContentBranch>;
  ContentRevision: EntityMap<ContentRevision>;
  User: EntityMap<User>;
  UserAccount: EntityMap<UserAccount>;
  UserSession: EntityMap<UserSession>;
}

export const createEntityStore = (): EntityStore => ({
  Content: {},
  ContentBranch: {},
  ContentRevision: {},
  User: {},
  UserAccount: {},
  UserSession: {}
});
