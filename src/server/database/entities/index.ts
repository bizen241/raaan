import { EntityManager } from "typeorm";
import { ExerciseDetailEntity } from "./ContentDetailEntity";
import { ExerciseEntity } from "./ContentEntity";
import { ExerciseRevisionEntity } from "./ContentRevisionEntity";
import { ExerciseTagEntity } from "./ContentTagEntity";
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
  | ExerciseDetailEntity
  | ExerciseEntity
  | ExerciseRevisionEntity
  | ExerciseTagEntity
  | UserAccountEntity
  | UserConfigEntity
  | UserEntity
  | UserSessionEntity;

export const entities = [
  ExerciseDetailEntity,
  ExerciseEntity,
  ExerciseRevisionEntity,
  ExerciseTagEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserEntity,
  UserSessionEntity
];

export type EntityCreator<E extends Entity> = (manager: EntityManager, params: Partial<E>) => Promise<E>;
