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
  UserDiary,
  UserSession,
  UserSummary
} from "../entities";

export type SearchParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">> & {
  limit: number;
  offset: number;
};

export type SearchParamsMap = {
  Exercise: SearchParams<Exercise>;
  ExerciseSummary: SearchParams<ExerciseSummary>;
  ExerciseTag: SearchParams<ExerciseTag>;
  Submission: SearchParams<Submission>;
  SubmissionSummary: SearchParams<SubmissionSummary>;
  User: SearchParams<User>;
  UserAccount: SearchParams<UserAccount>;
  UserConfig: SearchParams<UserConfig>;
  UserDiary: SearchParams<UserDiary>;
  UserSession: SearchParams<UserSession>;
  UserSummary: SearchParams<UserSummary>;
};
