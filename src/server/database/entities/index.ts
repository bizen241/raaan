export * from "./Account";
export * from "./Session";
export * from "./User";

import { AccountEntity } from "./Account";
import { SessionEntity } from "./Session";
import { UserEntity } from "./User";

export const entities = [AccountEntity, SessionEntity, UserEntity];
