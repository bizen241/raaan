import { Content } from "./Content";
import { ContentObject } from "./ContentObject";
import { ContentRevision } from "./ContentRevision";
import { ContentTag } from "./ContentTag";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserSession } from "./UserSession";

export * from "./Content";
export * from "./ContentObject";
export * from "./ContentRevision";
export * from "./ContentTag";
export * from "./User";
export * from "./UserAccount";
export * from "./UserSession";

export type EntityType =
  | "Content"
  | "ContentObject"
  | "ContentRevision"
  | "ContentTag"
  | "User"
  | "UserAccount"
  | "UserSession";

export type EntityObject = Content | ContentObject | ContentRevision | ContentTag | User | UserAccount | UserSession;
