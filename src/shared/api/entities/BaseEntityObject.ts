import { EntityId, EntityType } from ".";

export interface BaseEntityObject<T extends EntityType> {
  id: EntityId<T>;
  createdAt: number;
  updatedAt: number;
  fetchedAt: number;
  searchLimit?: number;
  searchOffset?: number;
  searchOrder?: "ASC" | "DESC";
}
