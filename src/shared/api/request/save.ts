import { Omit } from "react-redux";
import { ContentRevision, EntityObject } from "../entities";

export type SaveParams<E extends EntityObject> = Partial<Omit<E, "id" | "createdAt" | "updatedAt" | "fetchedAt">>;

export type Params = SaveParams<ContentRevision>;
