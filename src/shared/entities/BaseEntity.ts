import { EntityType } from ".";

export interface BaseEntity<T extends EntityType> {
  type: T;
  id: string;
  createdAt: number;
  updatedAt: number;
}
