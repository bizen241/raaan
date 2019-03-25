import { Omit } from "react-redux";
import { Content, ExerciseTag, EntityObject, ExerciseRevision, User, UserAccount, UserSession } from "../entities";

export type SaveParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">>;

export type SaveParamsMap = {
  Content: SaveParams<Content>;
  ExerciseRevision: SaveParams<ExerciseRevision>;
  ExerciseTag: SaveParams<ExerciseTag>;
  User: SaveParams<User>;
  UserAccount: SaveParams<UserAccount>;
  UserSession: SaveParams<UserSession>;
};
