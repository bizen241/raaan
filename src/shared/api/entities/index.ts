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

export type EntityTypeToObject = {
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

type EntityTypeToEmptyObject = {
  Exercise: {};
  ExerciseSummary: {};
  ExerciseTag: {};
  Submission: {};
  SubmissionSummary: {};
  User: {};
  UserAccount: {};
  UserConfig: {};
  UserSession: {};
  UserSummary: {};
};

export const createEntityTypeToEmptyObject = <T extends EntityTypeToEmptyObject>() =>
  ({
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
  } as T);
