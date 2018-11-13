import { AccountEntity } from "./AccountEntity";
import { SessionEntity } from "./SessionEntity";
import { UserEntity } from "./UserEntity";

export * from "./AccountEntity";
export * from "./SessionEntity";
export * from "./UserEntity";

export type EntityClass = AccountEntity | SessionEntity | UserEntity;

export const entities = [AccountEntity, SessionEntity, UserEntity];
