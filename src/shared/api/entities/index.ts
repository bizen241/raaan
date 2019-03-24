import { Content } from "./Content";
import { ContentDetail } from "./ContentDetail";
import { ContentRevision } from "./ContentRevision";
import { ContentTag } from "./ContentTag";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserConfig } from "./UserConfig";
import { UserSession } from "./UserSession";

export * from "./Content";
export * from "./ContentDetail";
export * from "./ContentRevision";
export * from "./ContentTag";
export * from "./User";
export * from "./UserAccount";
export * from "./UserConfig";
export * from "./UserSession";

export type EntityType =
  | "Content"
  | "ContentDetail"
  | "ContentRevision"
  | "ContentRevisionDetail"
  | "ContentTag"
  | "User"
  | "UserAccount"
  | "UserConfig"
  | "UserSession";

export type EntityObject =
  | Content
  | ContentDetail
  | ContentRevision
  | ContentTag
  | User
  | UserAccount
  | UserConfig
  | UserSession;

export type EntityTypeToObject = {
  Content: Content;
  ContentDetail: ContentDetail;
  ContentRevision: ContentRevision;
  ContentTag: ContentTag;
  User: User;
  UserAccount: UserAccount;
  UserConfig: UserConfig;
  UserSession: UserSession;
};

type EntityTypeToEmptyObject = {
  Content: {};
  ContentDetail: {};
  ContentRevision: {};
  ContentTag: {};
  User: {};
  UserAccount: {};
  UserConfig: {};
  UserSession: {};
};

export const createEntityTypeToEmptyObject = <T extends EntityTypeToEmptyObject>() =>
  ({
    Content: {},
    ContentDetail: {},
    ContentRevision: {},
    ContentTag: {},
    User: {},
    UserAccount: {},
    UserConfig: {},
    UserSession: {}
  } as T);
