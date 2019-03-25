import { Content } from "./Content";
import { ExerciseDetail } from "./ContentDetail";
import { ExerciseRevision } from "./ContentRevision";
import { ExerciseTag } from "./ContentTag";
import { User } from "./User";
import { UserAccount } from "./UserAccount";
import { UserConfig } from "./UserConfig";
import { UserSession } from "./UserSession";

export * from "./Content";
export * from "./ContentDetail";
export * from "./ContentRevision";
export * from "./ContentTag";
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
  | Content
  | ExerciseDetail
  | ExerciseRevision
  | ExerciseTag
  | User
  | UserAccount
  | UserConfig
  | UserSession;

export type EntityTypeToObject = {
  Content: Content;
  ExerciseDetail: ExerciseDetail;
  ExerciseRevision: ExerciseRevision;
  ExerciseTag: ExerciseTag;
  User: User;
  UserAccount: UserAccount;
  UserConfig: UserConfig;
  UserSession: UserSession;
};

type EntityTypeToEmptyObject = {
  Content: {};
  ExerciseDetail: {};
  ExerciseRevision: {};
  ExerciseTag: {};
  User: {};
  UserAccount: {};
  UserConfig: {};
  UserSession: {};
};

export const createEntityTypeToEmptyObject = <T extends EntityTypeToEmptyObject>() =>
  ({
    Content: {},
    ExerciseDetail: {},
    ExerciseRevision: {},
    ExerciseTag: {},
    User: {},
    UserAccount: {},
    UserConfig: {},
    UserSession: {}
  } as T);
