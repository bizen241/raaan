import { EntityManager } from "typeorm";
import { ContentDetailEntity } from "./ContentDetailEntity";
import { ContentEntity } from "./ContentEntity";
import { ContentRevisionEntity } from "./ContentRevisionEntity";
import { ContentTagEntity } from "./ContentTagEntity";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserEntity } from "./UserEntity";
import { UserSessionEntity } from "./UserSessionEntity";

export * from "./ContentDetailEntity";
export * from "./ContentEntity";
export * from "./ContentRevisionEntity";
export * from "./ContentTagEntity";
export * from "./UserAccountEntity";
export * from "./UserConfigEntity";
export * from "./UserEntity";
export * from "./UserSessionEntity";

export type Entity =
  | ContentDetailEntity
  | ContentEntity
  | ContentRevisionEntity
  | ContentTagEntity
  | UserAccountEntity
  | UserConfigEntity
  | UserEntity
  | UserSessionEntity;

export const entities = [
  ContentDetailEntity,
  ContentEntity,
  ContentRevisionEntity,
  ContentTagEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserEntity,
  UserSessionEntity
];

export type EntityCreator<E extends Entity> = (manager: EntityManager, params: Partial<E>) => Promise<E>;
