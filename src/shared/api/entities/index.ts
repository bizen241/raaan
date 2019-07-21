import { Exercise } from "./Exercise";
import { ExerciseSummary } from "./ExerciseSummary";
import { ExerciseTag } from "./ExerciseTag";
import { Submission } from "./Submission";
import { SubmissionSummary } from "./SubmissionSummary";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserConfig } from "./UserConfig";
import { UserSession } from "./UserSession";
import { UserSummary } from "./UserSummary";

export * from "./Exercise";
export * from "./ExerciseSummary";
export * from "./ExerciseTag";
export * from "./Submission";
export * from "./SubmissionSummary";
export * from "./User";
export * from "./UserAccount";
export * from "./UserConfig";
export * from "./UserSession";
export * from "./UserSummary";

export type EntityType =
  | "Exercise"
  | "ExerciseSummary"
  | "ExerciseTag"
  | "Submission"
  | "SubmissionSummary"
  | "User"
  | "UserAccount"
  | "UserConfig"
  | "UserSession"
  | "UserSummary";

export type EntityObject =
  | Exercise
  | ExerciseSummary
  | ExerciseTag
  | Submission
  | SubmissionSummary
  | User
  | UserAccount
  | UserConfig
  | UserSession
  | UserSummary;

export type EntityTypeToEntity = {
  Exercise: Exercise;
  ExerciseSummary: ExerciseSummary;
  ExerciseTag: ExerciseTag;
  Submission: Submission;
  SubmissionSummary: SubmissionSummary;
  User: User;
  UserAccount: UserAccount;
  UserConfig: UserConfig;
  UserSession: UserSession;
  UserSummary: UserSummary;
};

type EntityTypeToObject = { [P in keyof EntityTypeToEntity]: object };

export const createEntityTypeToObject = <T extends EntityTypeToObject>() => {
  const entityTypeToObject: EntityTypeToObject = {
    Exercise: {},
    ExerciseSummary: {},
    ExerciseTag: {},
    Submission: {},
    SubmissionSummary: {},
    User: {},
    UserAccount: {},
    UserConfig: {},
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
