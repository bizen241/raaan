import { EntityObject, EntityTypeToEntity } from "../entities";

export type SearchParams<E extends EntityObject> = {
  limit?: number;
  offset?: number;
} & Partial<E>;

export type SearchParamsMap = { [P in keyof EntityTypeToEntity]: SearchParams<EntityTypeToEntity[P]> };
