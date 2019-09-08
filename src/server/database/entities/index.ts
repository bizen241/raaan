import { EntityManager } from "typeorm";
import { ExerciseDiaryEntity } from "./ExerciseDiaryEntity";
import { ExerciseEntity } from "./ExerciseEntity";
import { ExerciseReportEntity } from "./ExerciseReportEntity";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";
import { ExerciseTagEntity } from "./ExerciseTagEntity";
import { PlaylistEntity } from "./PlaylistEntity";
import { PlaylistItemEntity } from "./PlaylistItemEntity";
import { PlaylistSummaryEntity } from "./PlaylistSummaryEntity";
import { PlaylistTagEntity } from "./PlaylistTagEntity";
import { SubmissionEntity } from "./SubmissionEntity";
import { SubmissionSummaryEntity } from "./SubmissionSummaryEntity";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserDiaryEntity } from "./UserDiaryEntity";
import { UserEntity } from "./UserEntity";
import { UserSessionEntity } from "./UserSessionEntity";
import { UserSummaryEntity } from "./UserSummaryEntity";

export * from "./ExerciseDiaryEntity";
export * from "./ExerciseEntity";
export * from "./ExerciseReportEntity";
export * from "./ExerciseSummaryEntity";
export * from "./ExerciseTagEntity";
export * from "./PlaylistEntity";
export * from "./PlaylistItemEntity";
export * from "./PlaylistSummaryEntity";
export * from "./PlaylistTagEntity";
export * from "./SubmissionEntity";
export * from "./SubmissionSummaryEntity";
export * from "./UserAccountEntity";
export * from "./UserConfigEntity";
export * from "./UserDiaryEntity";
export * from "./UserEntity";
export * from "./UserSessionEntity";
export * from "./UserSummaryEntity";

export type Entity =
  | ExerciseDiaryEntity
  | ExerciseEntity
  | ExerciseReportEntity
  | ExerciseSummaryEntity
  | ExerciseTagEntity
  | PlaylistEntity
  | PlaylistItemEntity
  | PlaylistSummaryEntity
  | PlaylistTagEntity
  | SubmissionEntity
  | SubmissionSummaryEntity
  | UserAccountEntity
  | UserConfigEntity
  | UserDiaryEntity
  | UserEntity
  | UserSessionEntity
  | UserSummaryEntity;

export const entities = [
  ExerciseDiaryEntity,
  ExerciseEntity,
  ExerciseReportEntity,
  ExerciseSummaryEntity,
  ExerciseTagEntity,
  PlaylistEntity,
  PlaylistItemEntity,
  PlaylistSummaryEntity,
  PlaylistTagEntity,
  SubmissionEntity,
  SubmissionSummaryEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserDiaryEntity,
  UserEntity,
  UserSessionEntity,
  UserSummaryEntity
];

export type EntityCreator<E extends Entity> = (manager: EntityManager, params: Partial<E>) => Promise<E>;
