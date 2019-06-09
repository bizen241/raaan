import { EntityManager } from "typeorm";
import { ExerciseEntity } from "./ExerciseEntity";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";
import { ExerciseTagEntity } from "./ExerciseTagEntity";
import { SubmissionEntity } from "./SubmissionEntity";
import { SubmissionSummaryEntity } from "./SubmissionSummaryEntity";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserDiaryEntity } from "./UserDiaryEntity";
import { UserEntity } from "./UserEntity";
import { UserSessionEntity } from "./UserSessionEntity";
import { UserSummaryEntity } from "./UserSummaryEntity";

export * from "./ExerciseEntity";
export * from "./ExerciseSummaryEntity";
export * from "./ExerciseTagEntity";
export * from "./SubmissionEntity";
export * from "./SubmissionSummaryEntity";
export * from "./UserAccountEntity";
export * from "./UserConfigEntity";
export * from "./UserDiaryEntity";
export * from "./UserEntity";
export * from "./UserSessionEntity";
export * from "./UserSummaryEntity";

export type Entity =
  | SubmissionSummaryEntity
  | SubmissionEntity
  | ExerciseEntity
  | ExerciseSummaryEntity
  | ExerciseTagEntity
  | UserAccountEntity
  | UserConfigEntity
  | UserDiaryEntity
  | UserEntity
  | UserSessionEntity
  | UserSummaryEntity;

export const entities = [
  SubmissionSummaryEntity,
  SubmissionEntity,
  ExerciseEntity,
  ExerciseSummaryEntity,
  ExerciseTagEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserDiaryEntity,
  UserEntity,
  UserSessionEntity,
  UserSummaryEntity
];

export type EntityCreator<E extends Entity> = (manager: EntityManager, params: Partial<E>) => Promise<E>;
