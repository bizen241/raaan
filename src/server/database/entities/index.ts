export * from "./AccountEntity";
export * from "./SessionEntity";
export * from "./UserEntity";

import { AccountEntity } from "./AccountEntity";
import { SessionEntity } from "./SessionEntity";
import { UserEntity } from "./UserEntity";

export const entities = [AccountEntity, SessionEntity, UserEntity];
