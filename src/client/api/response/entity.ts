import { EntityStore } from "../../../shared/api/response/entity";

export const mergeEntityStore = (target: EntityStore, source: EntityStore): EntityStore => ({
  Account: { ...target.Account, ...source.Account },
  Session: { ...target.Session, ...source.Session },
  User: { ...target.User, ...source.User }
});
