import {
  Content,
  ContentDetail,
  ContentRevision,
  ContentTag,
  EntityObject,
  User,
  UserAccount,
  UserConfig,
  UserSession
} from "../entities";

export interface EntityMap<E extends EntityObject> {
  [id: string]: E | undefined;
}

export interface EntityStore {
  Content: { [id: string]: Content | undefined };
  ContentDetail: { [id: string]: ContentDetail | undefined };
  ContentRevision: { [id: string]: ContentRevision | undefined };
  ContentTag: { [id: string]: ContentTag | undefined };
  User: { [id: string]: User | undefined };
  UserAccount: { [id: string]: UserAccount | undefined };
  UserConfig: { [id: string]: UserConfig | undefined };
  UserSession: { [id: string]: UserSession | undefined };
}

export const createEntityStore = (): EntityStore => ({
  Content: {},
  ContentDetail: {},
  ContentRevision: {},
  ContentTag: {},
  User: {},
  UserAccount: {},
  UserConfig: {},
  UserSession: {}
});
