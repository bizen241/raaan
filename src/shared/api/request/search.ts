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

export type SearchParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">> & {
  limit: number;
  offset: number;
};

export type SearchParamsMap = {
  Exercise: SearchParams<Exercise>;
  ExerciseDetail: SearchParams<ExerciseDetail>;
  ExerciseRevision: SearchParams<ExerciseRevision>;
  ExerciseRevisionDetail: SearchParams<ExerciseRevisionDetail>;
  ExerciseSummary: SearchParams<ExerciseSummary>;
  ExerciseTag: SearchParams<ExerciseTag>;
  User: SearchParams<User>;
  UserAccount: SearchParams<UserAccount>;
  UserConfig: SearchParams<UserConfig>;
  UserSession: SearchParams<UserSession>;
};
