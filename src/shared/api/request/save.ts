import { Omit } from "react-redux";
import { Exercise, ExerciseTag, EntityObject, ExerciseRevision, User, UserAccount, UserSession } from "../entities";

export type SaveParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">>;

export type SaveParamsMap = {
  Exercise: SaveParams<Exercise>;
  ExerciseRevision: SaveParams<ExerciseRevision>;
  ExerciseTag: SaveParams<ExerciseTag>;
  User: SaveParams<User>;
  UserAccount: SaveParams<UserAccount>;
  UserSession: SaveParams<UserSession>;
};
