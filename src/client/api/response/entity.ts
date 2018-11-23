import { EntityStore } from "../../../shared/api/response/entity";

export const mergeEntityStore = (target: EntityStore, source: EntityStore): EntityStore => ({
  User: { ...target.User, ...source.User },
  UserAccount: { ...target.UserAccount, ...source.UserAccount },
  UserSession: { ...target.UserSession, ...source.UserSession }
});
