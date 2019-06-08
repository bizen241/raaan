import { Exercise } from "./Exercise";
import { ExerciseSummary } from "./ExerciseSummary";
import { ExerciseTag } from "./ExerciseTag";
import { Submission } from "./Submission";
import { SubmissionSummary } from "./SubmissionSummary";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserConfig } from "./UserConfig";
import { UserDiary } from "./UserDiary";
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
export * from "./UserDiary";
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
  | "UserDiary"
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
  | UserDiary
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
  UserDiary: UserDiary;
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
  UserDiary: {};
  UserSession: {};
  UserSummary: {};
};

export const createEntityTypeToEmptyObject = <T extends EntityTypeToEmptyObject>() =>
  ({
    Exercise: {},
    ExerciseSummary: {},
    ExerciseTag: {},
    User: {},
    UserAccount: {},
    UserConfig: {},
    UserDiary: {},
    UserSession: {},
    UserSummary: {}
  } as T);
