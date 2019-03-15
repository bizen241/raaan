import { EntityStore } from "../../../shared/api/response/get";

export const mergeEntityStore = (target: EntityStore, source: EntityStore): EntityStore => ({
  Content: { ...target.Content, ...source.Content },
  ContentRevision: { ...target.ContentRevision, ...source.ContentRevision },
  ContentTag: { ...target.ContentTag, ...source.ContentTag },
  User: { ...target.User, ...source.User },
  UserAccount: { ...target.UserAccount, ...source.UserAccount },
  UserSession: { ...target.UserSession, ...source.UserSession }
});
