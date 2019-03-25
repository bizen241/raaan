import { Omit } from "react-redux";
import { Exercise, ExerciseRevision, ExerciseTag, EntityObject, User, UserAccount, UserSession } from "../entities";

export type SearchParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">> & {
  limit: number;
  offset: number;
};

export type SearchParamsMap = {
  Exercise: SearchParams<Exercise>;
  ExerciseRevision: SearchParams<ExerciseRevision>;
  ExerciseTag: SearchParams<ExerciseTag>;
  User: SearchParams<User>;
  UserAccount: SearchParams<UserAccount>;
  UserSession: SearchParams<UserSession>;
};
