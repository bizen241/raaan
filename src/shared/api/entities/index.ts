import { Exercise } from "./Exercise";
import { ExerciseDetail } from "./ExerciseDetail";
import { ExerciseRevision } from "./ExerciseRevision";
import { ExerciseRevisionDetail } from "./ExerciseRevisionDetail";
import { ExerciseTag } from "./ExerciseTag";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserConfig } from "./UserConfig";
import { UserSession } from "./UserSession";

export * from "./Exercise";
export * from "./ExerciseDetail";
export * from "./ExerciseDetailObject";
export * from "./ExerciseRevision";
export * from "./ExerciseRevisionDetail";
export * from "./ExerciseTag";
export * from "./User";
export * from "./UserAccount";
export * from "./UserConfig";
export * from "./UserSession";

export type EntityType =
  | "Exercise"
  | "ExerciseDetail"
  | "ExerciseRevision"
  | "ExerciseRevisionDetail"
  | "ExerciseTag"
  | "User"
  | "UserAccount"
  | "UserConfig"
  | "UserSession";

export type EntityObject =
  | Exercise
  | ExerciseDetail
  | ExerciseRevision
  | ExerciseRevisionDetail
  | ExerciseTag
  | User
  | UserAccount
  | UserConfig
  | UserSession;

export type EntityTypeToObject = {
  Exercise: Exercise;
  ExerciseDetail: ExerciseDetail;
  ExerciseRevision: ExerciseRevision;
  ExerciseRevisionDetail: ExerciseRevisionDetail;
  ExerciseTag: ExerciseTag;
  User: User;
  UserAccount: UserAccount;
  UserConfig: UserConfig;
  UserSession: UserSession;
};

type EntityTypeToEmptyObject = {
  Exercise: {};
  ExerciseDetail: {};
  ExerciseRevision: {};
  ExerciseRevisionDetail: {};
  ExerciseTag: {};
  User: {};
  UserAccount: {};
  UserConfig: {};
  UserSession: {};
};

export const createEntityTypeToEmptyObject = <T extends EntityTypeToEmptyObject>() =>
  ({
    Exercise: {},
    ExerciseDetail: {},
    ExerciseRevision: {},
    ExerciseRevisionDetail: {},
    ExerciseTag: {},
    User: {},
    UserAccount: {},
    UserConfig: {},
    UserSession: {}
  } as T);
