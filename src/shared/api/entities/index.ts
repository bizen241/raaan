import { Exercise } from "./Exercise";
import { ExerciseSummary } from "./ExerciseSummary";
import { ExerciseTag } from "./ExerciseTag";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserConfig } from "./UserConfig";
import { UserSession } from "./UserSession";

export * from "./Exercise";
export * from "./ExerciseSummary";
export * from "./ExerciseTag";
export * from "./User";
export * from "./UserAccount";
export * from "./UserConfig";
export * from "./UserSession";

export type EntityType =
  | "Exercise"
  | "ExerciseSummary"
  | "ExerciseTag"
  | "User"
  | "UserAccount"
  | "UserConfig"
  | "UserSession";

export type EntityObject = Exercise | ExerciseSummary | ExerciseTag | User | UserAccount | UserConfig | UserSession;

export type EntityTypeToObject = {
  Exercise: Exercise;
  ExerciseSummary: ExerciseSummary;
  ExerciseTag: ExerciseTag;
  User: User;
  UserAccount: UserAccount;
  UserConfig: UserConfig;
  UserSession: UserSession;
};

type EntityTypeToEmptyObject = {
  Exercise: {};
  ExerciseSummary: {};
  ExerciseTag: {};
  User: {};
  UserAccount: {};
  UserConfig: {};
  UserSession: {};
};

export const createEntityTypeToEmptyObject = <T extends EntityTypeToEmptyObject>() =>
  ({
    Exercise: {},
    ExerciseSummary: {},
    ExerciseTag: {},
    User: {},
    UserAccount: {},
    UserConfig: {},
    UserSession: {}
  } as T);
