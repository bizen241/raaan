import { EntityObject, EntityTypeToEntity } from "../entities";

export type Params<E extends EntityObject> = Partial<E>;

export type EntityTypeToParams = { [P in keyof EntityTypeToEntity]: Params<EntityTypeToEntity[P]> };

export const defaultSearchLimit = 10;
export const defaultSearchOffset = 0;
