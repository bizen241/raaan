import { EntityManager } from "typeorm";
import { ExerciseDetailEntity } from "./ExerciseDetailEntity";
import { ExerciseEntity } from "./ExerciseEntity";
import { ExerciseRevisionDetailEntity } from "./ExerciseRevisionDetailEntity";
import { ExerciseRevisionEntity } from "./ExerciseRevisionEntity";
import { ExerciseTagEntity } from "./ExerciseTagEntity";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserEntity } from "./UserEntity";
import { UserSessionEntity } from "./UserSessionEntity";

export * from "./ExerciseDetailEntity";
export * from "./ExerciseEntity";
export * from "./ExerciseRevisionDetailEntity";
export * from "./ExerciseRevisionEntity";
export * from "./ExerciseTagEntity";
export * from "./UserAccountEntity";
export * from "./UserConfigEntity";
export * from "./UserEntity";
export * from "./UserSessionEntity";

export type Entity =
  | ExerciseDetailEntity
  | ExerciseEntity
  | ExerciseRevisionDetailEntity
  | ExerciseRevisionEntity
  | ExerciseTagEntity
  | UserAccountEntity
  | UserConfigEntity
  | UserEntity
  | UserSessionEntity;

export const entities = [
  ExerciseDetailEntity,
  ExerciseEntity,
  ExerciseRevisionDetailEntity,
  ExerciseRevisionEntity,
  ExerciseTagEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserEntity,
  UserSessionEntity
];

export type EntityCreator<E extends Entity> = (manager: EntityManager, params: Partial<E>) => Promise<E>;
