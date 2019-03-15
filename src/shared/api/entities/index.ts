import { Content } from "./Content";
import { ContentRevision } from "./ContentRevision";
import { ContentTag } from "./ContentTag";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserSession } from "./UserSession";

export * from "./Content";
export * from "./ContentRevision";
export * from "./ContentTag";
export * from "./User";
export * from "./UserAccount";
export * from "./UserSession";

export type EntityType = "Content" | "ContentRevision" | "ContentTag" | "User" | "UserAccount" | "UserSession";

export type EntityObject = Content | ContentRevision | ContentTag | User | UserAccount | UserSession;

export type EntityTypeToObject = {
  Content: Content;
  ContentRevision: ContentRevision;
  ContentTag: ContentTag;
  User: User;
  UserAccount: UserAccount;
  UserSession: UserSession;
};

type EntityTypeToEmptyObject = {
  Content: {};
  ContentRevision: {};
  ContentTag: {};
  User: {};
  UserAccount: {};
  UserSession: {};
};

export const createEntityTypeToEmptyObject = <T extends EntityTypeToEmptyObject>() =>
  ({
    Content: {},
    ContentRevision: {},
    ContentTag: {},
    User: {},
    UserAccount: {},
    UserSession: {}
  } as T);
