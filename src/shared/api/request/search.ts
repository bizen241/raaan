import { Omit } from "react-redux";
import {
  Content,
  ContentRevision,
  ContentTag,
  EntityObject,
  User,
  UserAccount,
  UserConfig,
  UserSession
} from "../entities";

export type SearchParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">> & {
  page: number;
};

export type SearchParamsMap = {
  Content: SearchParams<Content>;
  ContentRevision: SearchParams<ContentRevision>;
  ContentTag: SearchParams<ContentTag>;
  User: SearchParams<User>;
  UserAccount: SearchParams<UserAccount>;
  UserConfig: SearchParams<UserConfig>;
  UserSession: SearchParams<UserSession>;
};
