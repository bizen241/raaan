import { Omit } from "react-redux";
import { Content, ContentRevision, ContentTag, EntityObject, User, UserAccount, UserSession } from "../entities";

export type SaveParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">>;

export type SaveParamsMap = {
  Content: SaveParams<Content>;
  ContentRevision: SaveParams<ContentRevision>;
  ContentTag: SaveParams<ContentTag>;
  User: SaveParams<User>;
  UserAccount: SaveParams<UserAccount>;
  UserSession: SaveParams<UserSession>;
};
