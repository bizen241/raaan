import { EntityObject } from "../entities";

export type SaveParams<E extends EntityObject> = Partial<E> & Pick<E, "type" | "id">;
