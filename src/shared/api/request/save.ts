import { Omit } from "react-redux";
import {
  EntityObject,
  Exercise,
  ExerciseDetail,
  ExerciseRevision,
  ExerciseRevisionDetail,
  ExerciseSummary,
  ExerciseTag,
  User,
  UserAccount,
  UserConfig,
  UserSession
} from "../entities";

export type SaveParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">>;

export type SaveParamsMap = {
  Exercise: SaveParams<Exercise>;
  ExerciseDetail: SaveParams<ExerciseDetail>;
  ExerciseRevision: SaveParams<ExerciseRevision>;
  ExerciseRevisionDetail: SaveParams<ExerciseRevisionDetail>;
  ExerciseSummary: SaveParams<ExerciseSummary>;
  ExerciseTag: SaveParams<ExerciseTag>;
  User: SaveParams<User>;
  UserAccount: SaveParams<UserAccount>;
  UserConfig: SaveParams<UserConfig>;
  UserSession: SaveParams<UserSession>;
};
