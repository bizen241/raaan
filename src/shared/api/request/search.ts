import { EntityObject } from "../entities";

export type SearchParams<E extends EntityObject> = Partial<E> & Pick<E, "type"> & { page: number };
