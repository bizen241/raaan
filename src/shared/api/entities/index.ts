import { Exercise } from "./Exercise";
import { ExerciseDiary } from "./ExerciseDiary";
import { ExerciseReport } from "./ExerciseReport";
import { ExerciseSummary } from "./ExerciseSummary";
import { ExerciseTag } from "./ExerciseTag";
import { ExerciseVote } from "./ExerciseVote";
import { Submission } from "./Submission";
import { SubmissionSummary } from "./SubmissionSummary";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserConfig } from "./UserConfig";
import { UserDiary } from "./UserDiary";
import { UserSession } from "./UserSession";
import { UserSummary } from "./UserSummary";

export * from "./Exercise";
export * from "./ExerciseDiary";
export * from "./ExerciseReport";
export * from "./ExerciseSummary";
export * from "./ExerciseTag";
export * from "./ExerciseVote";
export * from "./Submission";
export * from "./SubmissionSummary";
export * from "./User";
export * from "./UserAccount";
export * from "./UserConfig";
export * from "./UserDiary";
export * from "./UserSession";
export * from "./UserSummary";

export type EntityObject =
  | Exercise
  | ExerciseDiary
  | ExerciseReport
  | ExerciseSummary
  | ExerciseTag
  | ExerciseVote
  | Submission
  | SubmissionSummary
  | User
  | UserAccount
  | UserConfig
  | UserDiary
  | UserSession
  | UserSummary;

export type EntityTypeToEntity = {
  Exercise: Exercise;
  ExerciseDiary: ExerciseDiary;
  ExerciseReport: ExerciseReport;
  ExerciseSummary: ExerciseSummary;
  ExerciseTag: ExerciseTag;
  ExerciseVote: ExerciseVote;
  Submission: Submission;
  SubmissionSummary: SubmissionSummary;
  User: User;
  UserAccount: UserAccount;
  UserConfig: UserConfig;
  UserDiary: UserDiary;
  UserSession: UserSession;
  UserSummary: UserSummary;
};

export type EntityType = keyof EntityTypeToEntity;

type EntityTypeToObject = { [P in EntityType]: object };

export const createEntityTypeToObject = <T extends EntityTypeToObject>() => {
  const entityTypeToObject: EntityTypeToObject = {
    Exercise: {},
    ExerciseDiary: {},
    ExerciseReport: {},
    ExerciseSummary: {},
    ExerciseTag: {},
    ExerciseVote: {},
    Submission: {},
    SubmissionSummary: {},
    User: {},
    UserAccount: {},
    UserConfig: {},
    UserDiary: {},
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
