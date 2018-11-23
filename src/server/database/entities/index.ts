import { UserAccountEntity } from "./UserAccountEntity";
import { UserEntity } from "./UserEntity";
import { UserSessionEntity } from "./UserSessionEntity";

export * from "./UserAccountEntity";
export * from "./UserEntity";
export * from "./UserSessionEntity";

export type EntityClass = UserAccountEntity | UserSessionEntity | UserEntity;

export const entities = [UserAccountEntity, UserSessionEntity, UserEntity];
