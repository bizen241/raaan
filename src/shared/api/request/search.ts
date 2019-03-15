import { Omit } from "react-redux";
import { Content, ContentRevision, ContentTag, EntityObject, User, UserAccount, UserSession } from "../entities";

export type SearchParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">> & {
  limit: number;
  offset: number;
};

export type SearchParamsMap = {
  Content: SearchParams<Content>;
  ContentRevision: SearchParams<ContentRevision>;
  ContentTag: SearchParams<ContentTag>;
  User: SearchParams<User>;
  UserAccount: SearchParams<UserAccount>;
  UserSession: SearchParams<UserSession>;
};
