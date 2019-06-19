import { Omit } from "react-redux";
import {
  EntityObject,
  Exercise,
  ExerciseSummary,
  ExerciseTag,
  Submission,
  SubmissionSummary,
  User,
  UserAccount,
  UserConfig,
  UserSession,
  UserSummary
} from "../entities";

export type SaveParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">>;

export type SaveParamsMap = {
  Exercise: SaveParams<Exercise>;
  ExerciseSummary: SaveParams<ExerciseSummary>;
  ExerciseTag: SaveParams<ExerciseTag>;
  Submission: SaveParams<Submission>;
  SubmissionSummary: SaveParams<SubmissionSummary>;
  User: SaveParams<User>;
  UserAccount: SaveParams<UserAccount>;
  UserConfig: SaveParams<UserConfig>;
  UserSession: SaveParams<UserSession>;
  UserSummary: SaveParams<UserSummary>;
};
