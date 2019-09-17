import { Exercise } from "./Exercise";
import { ExerciseDiary } from "./ExerciseDiary";
import { ExerciseDraft } from "./ExerciseDraft";
import { ExerciseReport } from "./ExerciseReport";
import { ExerciseSummary } from "./ExerciseSummary";
import { ExerciseTag } from "./ExerciseTag";
import { ExerciseVote } from "./ExerciseVote";
import { Playlist } from "./Playlist";
import { PlaylistBookmark } from "./PlaylistBookmark";
import { PlaylistItem } from "./PlaylistItem";
import { PlaylistReport } from "./PlaylistReport";
import { PlaylistSummary } from "./PlaylistSummary";
import { PlaylistTag } from "./PlaylistTag";
import { Submission } from "./Submission";
import { SubmissionSummary } from "./SubmissionSummary";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserConfig } from "./UserConfig";
import { UserDiary } from "./UserDiary";
import { UserReport } from "./UserReport";
import { UserSession } from "./UserSession";
import { UserSummary } from "./UserSummary";

export * from "./BaseExerciseObject";
export * from "./Exercise";
export * from "./ExerciseDiary";
export * from "./ExerciseDraft";
export * from "./ExerciseReport";
export * from "./ExerciseSummary";
export * from "./ExerciseTag";
export * from "./ExerciseVote";
export * from "./Playlist";
export * from "./PlaylistBookmark";
export * from "./PlaylistItem";
export * from "./PlaylistReport";
export * from "./PlaylistSummary";
export * from "./PlaylistTag";
export * from "./Submission";
export * from "./SubmissionSummary";
export * from "./User";
export * from "./UserAccount";
export * from "./UserConfig";
export * from "./UserDiary";
export * from "./UserReport";
export * from "./UserSession";
export * from "./UserSummary";

export type EntityObject =
  | Exercise
  | ExerciseDiary
  | ExerciseDraft
  | ExerciseReport
  | ExerciseSummary
  | ExerciseTag
  | ExerciseVote
  | Playlist
  | PlaylistBookmark
  | PlaylistItem
  | PlaylistReport
  | PlaylistSummary
  | PlaylistTag
  | Submission
  | SubmissionSummary
  | User
  | UserAccount
  | UserConfig
  | UserDiary
  | UserReport
  | UserSession
  | UserSummary;

export type EntityTypeToEntity = {
  Exercise: Exercise;
  ExerciseDiary: ExerciseDiary;
  ExerciseDraft: ExerciseDraft;
  ExerciseReport: ExerciseReport;
  ExerciseSummary: ExerciseSummary;
  ExerciseTag: ExerciseTag;
  ExerciseVote: ExerciseVote;
  Playlist: Playlist;
  PlaylistBookmark: PlaylistBookmark;
  PlaylistItem: PlaylistItem;
  PlaylistReport: PlaylistReport;
  PlaylistSummary: PlaylistSummary;
  PlaylistTag: PlaylistTag;
  Submission: Submission;
  SubmissionSummary: SubmissionSummary;
  User: User;
  UserAccount: UserAccount;
  UserConfig: UserConfig;
  UserDiary: UserDiary;
  UserReport: UserReport;
  UserSession: UserSession;
  UserSummary: UserSummary;
};

export type EntityType = keyof EntityTypeToEntity;

type EntityTypeToObject = { [P in EntityType]: object };

export const createEntityTypeToObject = <T extends EntityTypeToObject>() => {
  const entityTypeToObject: EntityTypeToObject = {
    Exercise: {},
    ExerciseDiary: {},
    ExerciseDraft: {},
    ExerciseReport: {},
    ExerciseSummary: {},
    ExerciseTag: {},
    ExerciseVote: {},
    Playlist: {},
    PlaylistBookmark: {},
    PlaylistItem: {},
    PlaylistReport: {},
    PlaylistSummary: {},
    PlaylistTag: {},
    Submission: {},
    SubmissionSummary: {},
    User: {},
    UserAccount: {},
    UserConfig: {},
    UserDiary: {},
    UserReport: {},
    UserSession: {},
    UserSummary: {}
  };

  return entityTypeToObject as T;
};

export const mergeEntityTypeToObject = <T extends EntityTypeToObject>(target: Partial<T>, source: Partial<T>): T => {
  const merged: T = createEntityTypeToObject();

  (Object.keys(merged) as EntityType[]).forEach(entityType => {
    merged[entityType] = {
      ...target[entityType],
      ...source[entityType]
    };
  });

  return merged;
};
