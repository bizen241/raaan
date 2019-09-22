import { EntityManager } from "typeorm";
import { ExerciseDiaryEntity } from "./ExerciseDiaryEntity";
import { ExerciseDraftEntity } from "./ExerciseDraftEntity";
import { ExerciseEntity } from "./ExerciseEntity";
import { ExerciseReportEntity } from "./ExerciseReportEntity";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";
import { ExerciseTagEntity } from "./ExerciseTagEntity";
import { ExerciseVoteEntity } from "./ExerciseVoteEntity";
import { PlaylistBookmarkEntity } from "./PlaylistBookmarkEntity";
import { PlaylistEntity } from "./PlaylistEntity";
import { PlaylistItemEntity } from "./PlaylistItemEntity";
import { PlaylistReportEntity } from "./PlaylistReportEntity";
import { PlaylistSummaryEntity } from "./PlaylistSummaryEntity";
import { PlaylistTagEntity } from "./PlaylistTagEntity";
import { RevisionEntity } from "./RevisionEntity";
import { RevisionSummaryEntity } from "./RevisionSummaryEntity";
import { SubmissionEntity } from "./SubmissionEntity";
import { SubmissionSummaryEntity } from "./SubmissionSummaryEntity";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserDiaryEntity } from "./UserDiaryEntity";
import { UserEntity } from "./UserEntity";
import { UserReportEntity } from "./UserReportEntity";
import { UserSessionEntity } from "./UserSessionEntity";
import { UserSummaryEntity } from "./UserSummaryEntity";

export * from "./ExerciseDiaryEntity";
export * from "./ExerciseDraftEntity";
export * from "./ExerciseEntity";
export * from "./ExerciseReportEntity";
export * from "./ExerciseSummaryEntity";
export * from "./ExerciseTagEntity";
export * from "./ExerciseVoteEntity";
export * from "./PlaylistBookmarkEntity";
export * from "./PlaylistEntity";
export * from "./PlaylistItemEntity";
export * from "./PlaylistReportEntity";
export * from "./PlaylistSummaryEntity";
export * from "./PlaylistTagEntity";
export * from "./RevisionEntity";
export * from "./RevisionSummaryEntity";
export * from "./SubmissionEntity";
export * from "./SubmissionSummaryEntity";
export * from "./UserAccountEntity";
export * from "./UserConfigEntity";
export * from "./UserDiaryEntity";
export * from "./UserEntity";
export * from "./UserReportEntity";
export * from "./UserSessionEntity";
export * from "./UserSummaryEntity";

export type Entity =
  | ExerciseDiaryEntity
  | ExerciseDraftEntity
  | ExerciseEntity
  | ExerciseReportEntity
  | ExerciseSummaryEntity
  | ExerciseTagEntity
  | ExerciseVoteEntity
  | PlaylistBookmarkEntity
  | PlaylistEntity
  | PlaylistItemEntity
  | PlaylistReportEntity
  | PlaylistSummaryEntity
  | PlaylistTagEntity
  | RevisionEntity
  | RevisionSummaryEntity
  | SubmissionEntity
  | SubmissionSummaryEntity
  | UserAccountEntity
  | UserConfigEntity
  | UserDiaryEntity
  | UserEntity
  | UserReportEntity
  | UserSessionEntity
  | UserSummaryEntity;

export const entities = [
  ExerciseDiaryEntity,
  ExerciseDraftEntity,
  ExerciseEntity,
  ExerciseReportEntity,
  ExerciseSummaryEntity,
  ExerciseTagEntity,
  ExerciseVoteEntity,
  PlaylistBookmarkEntity,
  PlaylistEntity,
  PlaylistItemEntity,
  PlaylistReportEntity,
  PlaylistSummaryEntity,
  PlaylistTagEntity,
  RevisionEntity,
  RevisionSummaryEntity,
  SubmissionEntity,
  SubmissionSummaryEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserDiaryEntity,
  UserEntity,
  UserReportEntity,
  UserSessionEntity,
  UserSummaryEntity
];

export type EntityCreator<E extends Entity> = (manager: EntityManager, params: Partial<E>) => Promise<E>;
