import { AccountEntity } from "./UserAccountEntity";
import { UserEntity } from "./UserEntity";
import { SessionEntity } from "./UserSessionEntity";

export * from "./UserAccountEntity";
export * from "./UserEntity";
export * from "./UserSessionEntity";

export type EntityClass = AccountEntity | SessionEntity | UserEntity;

export const entities = [AccountEntity, SessionEntity, UserEntity];
