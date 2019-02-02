import { Omit } from "react-redux";
import { EntityObject } from "../entities";

export type SearchParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">> & {
  page: number;
};
