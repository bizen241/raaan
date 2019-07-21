import { EntityObject, EntityTypeToEntity } from "../entities";

export type SearchParams<E extends EntityObject> = Partial<E> & {
  limit?: number;
  offset?: number;
};

export type SearchParamsMap = { [P in keyof EntityTypeToEntity]: SearchParams<EntityTypeToEntity[P]> };
