import {
  Content,
  ContentRevision,
  ContentTag,
  User,
  UserAccount,
  UserConfig,
  UserSession
} from "../../../../shared/api/entities";
import { SearchParams } from "../../../../shared/api/request/search";

export type SearchParamsMap = {
  Content: SearchParams<Content>;
  ContentRevision: SearchParams<ContentRevision>;
  ContentTag: SearchParams<ContentTag>;
  User: SearchParams<User>;
  UserAccount: SearchParams<UserAccount>;
  UserConfig: SearchParams<UserConfig>;
  UserSession: SearchParams<UserSession>;
};
