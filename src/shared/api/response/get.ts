import {
  EntityObject,
  Exercise,
  ExerciseSummary,
  ExerciseTag,
  User,
  UserAccount,
  UserConfig,
  UserSession
} from "../entities";

export interface EntityMap<E extends EntityObject> {
  [id: string]: E | undefined;
}

export interface EntityStore {
  Exercise: { [id: string]: Exercise | undefined };
  ExerciseSummary: { [id: string]: ExerciseSummary | undefined };
  ExerciseTag: { [id: string]: ExerciseTag | undefined };
  User: { [id: string]: User | undefined };
  UserAccount: { [id: string]: UserAccount | undefined };
  UserConfig: { [id: string]: UserConfig | undefined };
  UserSession: { [id: string]: UserSession | undefined };
}

export const createEntityStore = (): EntityStore => ({
  Exercise: {},
  ExerciseSummary: {},
  ExerciseTag: {},
  User: {},
  UserAccount: {},
  UserConfig: {},
  UserSession: {}
});
