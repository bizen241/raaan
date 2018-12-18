import { EntityObject } from "../entities";

export type SearchParams<E extends EntityObject> = Partial<E> & { page: number };
