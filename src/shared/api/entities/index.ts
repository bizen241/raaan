import { Content } from "./Content";
import { ContentBranch } from "./ContentBranch";
import { ContentRevision } from "./ContentRevision";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserSession } from "./UserSession";

export * from "./Content";
export * from "./ContentBranch";
export * from "./ContentRevision";
export * from "./User";
export * from "./UserAccount";
export * from "./UserSession";

export type EntityType = "Content" | "ContentBranch" | "ContentRevision" | "User" | "UserAccount" | "UserSession";

export type EntityObject = Content | ContentBranch | ContentRevision | User | UserAccount | UserSession;
