import { EntityStore } from "../../../shared/api/response/entity";

export const mergeEntityStore = (target: EntityStore, source: EntityStore): EntityStore => ({
  Content: { ...target.Content, ...source.Content },
  ContentBranch: { ...target.ContentBranch, ...source.ContentBranch },
  ContentRevision: { ...target.ContentRevision, ...source.ContentRevision },
  User: { ...target.User, ...source.User },
  UserAccount: { ...target.UserAccount, ...source.UserAccount },
  UserSession: { ...target.UserSession, ...source.UserSession }
});
