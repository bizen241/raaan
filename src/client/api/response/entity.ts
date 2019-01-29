import { EntityStore } from "../../../shared/api/response/entity";

export const mergeEntityStore = (target: EntityStore, source: EntityStore): EntityStore => ({
  Content: { ...target.Content, ...source.Content },
  ContentRevision: { ...target.ContentRevision, ...source.ContentRevision },
  ContentObject: { ...target.ContentObject, ...source.ContentObject },
  ContentTag: { ...target.ContentTag, ...source.ContentTag },
  User: { ...target.User, ...source.User },
  UserAccount: { ...target.UserAccount, ...source.UserAccount },
  UserSession: { ...target.UserSession, ...source.UserSession }
});
