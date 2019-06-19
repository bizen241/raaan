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

export interface EntityMap<E extends EntityObject> {
  [id: string]: E | undefined;
}

export interface EntityStore {
  Exercise: { [id: string]: Exercise | undefined };
  ExerciseSummary: { [id: string]: ExerciseSummary | undefined };
  ExerciseTag: { [id: string]: ExerciseTag | undefined };
  Submission: { [id: string]: Submission | undefined };
  SubmissionSummary: { [id: string]: SubmissionSummary | undefined };
  User: { [id: string]: User | undefined };
  UserAccount: { [id: string]: UserAccount | undefined };
  UserConfig: { [id: string]: UserConfig | undefined };
  UserSession: { [id: string]: UserSession | undefined };
  UserSummary: { [id: string]: UserSummary | undefined };
}

export const createEntityStore = (): EntityStore => ({
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
});
