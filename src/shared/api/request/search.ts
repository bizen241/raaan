import { Omit } from "react-redux";
import { Content, ExerciseRevision, ExerciseTag, EntityObject, User, UserAccount, UserSession } from "../entities";

export type SearchParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">> & {
  limit: number;
  offset: number;
};

export type SearchParamsMap = {
  Content: SearchParams<Content>;
  ExerciseRevision: SearchParams<ExerciseRevision>;
  ExerciseTag: SearchParams<ExerciseTag>;
  User: SearchParams<User>;
  UserAccount: SearchParams<UserAccount>;
  UserSession: SearchParams<UserSession>;
};
