import {
  EntityObject,
  Exercise,
  ExerciseDetail,
  ExerciseRevision,
  ExerciseRevisionDetail,
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
  ExerciseDetail: { [id: string]: ExerciseDetail | undefined };
  ExerciseRevision: { [id: string]: ExerciseRevision | undefined };
  ExerciseRevisionDetail: { [id: string]: ExerciseRevisionDetail | undefined };
  ExerciseTag: { [id: string]: ExerciseTag | undefined };
  User: { [id: string]: User | undefined };
  UserAccount: { [id: string]: UserAccount | undefined };
  UserConfig: { [id: string]: UserConfig | undefined };
  UserSession: { [id: string]: UserSession | undefined };
}

export const createEntityStore = (): EntityStore => ({
  Exercise: {},
  ExerciseDetail: {},
  ExerciseRevision: {},
  ExerciseRevisionDetail: {},
  ExerciseTag: {},
  User: {},
  UserAccount: {},
  UserConfig: {},
  UserSession: {}
});
