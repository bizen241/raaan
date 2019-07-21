import { EntityObject, EntityTypeToEntity } from "../entities";

export type SaveParams<E extends EntityObject> = Partial<E>;

export type SaveParamsMap = { [P in keyof EntityTypeToEntity]: SaveParams<EntityTypeToEntity[P]> };
