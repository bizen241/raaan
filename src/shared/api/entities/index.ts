import { Content } from "./Content";
import { ContentRevision } from "./ContentRevision";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserSession } from "./UserSession";

export * from "./Content";
export * from "./ContentRevision";
export * from "./User";
export * from "./UserAccount";
export * from "./UserSession";

export type EntityType = "Content" | "ContentRevision" | "User" | "UserAccount" | "UserSession";

export type EntityObject = Content | ContentRevision | User | UserAccount | UserSession;
