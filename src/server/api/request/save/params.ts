import {
  Content,
  ContentRevision,
  ContentTag,
  User,
  UserAccount,
  UserConfig,
  UserSession
} from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";

export type SaveParamsMap = {
  Content: SaveParams<Content>;
  ContentRevision: SaveParams<ContentRevision>;
  ContentTag: SaveParams<ContentTag>;
  User: SaveParams<User>;
  UserAccount: SaveParams<UserAccount>;
  UserConfig: SaveParams<UserConfig>;
  UserSession: SaveParams<UserSession>;
};
