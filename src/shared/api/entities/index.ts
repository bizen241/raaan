import { Account } from "./Account";
import { Session } from "./Session";
import { User } from "./User";

export * from "./Account";
export * from "./Session";
export * from "./User";

export type EntityType = "Account" | "Session" | "User";

export type EntityObject = Account | Session | User;
