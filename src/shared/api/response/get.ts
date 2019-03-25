import {
  Content,
  ExerciseDetail,
  ExerciseRevision,
  ExerciseTag,
  EntityObject,
  User,
  UserAccount,
  UserConfig,
  UserSession
} from "../entities";

export interface EntityMap<E extends EntityObject> {
  [id: string]: E | undefined;
}

export interface EntityStore {
  Content: { [id: string]: Content | undefined };
  ExerciseDetail: { [id: string]: ExerciseDetail | undefined };
  ExerciseRevision: { [id: string]: ExerciseRevision | undefined };
  ExerciseTag: { [id: string]: ExerciseTag | undefined };
  User: { [id: string]: User | undefined };
  UserAccount: { [id: string]: UserAccount | undefined };
  UserConfig: { [id: string]: UserConfig | undefined };
  UserSession: { [id: string]: UserSession | undefined };
}

export const createEntityStore = (): EntityStore => ({
  Content: {},
  ExerciseDetail: {},
  ExerciseRevision: {},
  ExerciseTag: {},
  User: {},
  UserAccount: {},
  UserConfig: {},
  UserSession: {}
});
