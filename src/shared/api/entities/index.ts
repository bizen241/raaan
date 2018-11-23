import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserSession } from "./UserSession";

export * from "./User";
export * from "./UserAccount";
export * from "./UserSession";

export type EntityType = "User" | "UserAccount" | "UserSession";

export type EntityObject = User | UserAccount | UserSession;
