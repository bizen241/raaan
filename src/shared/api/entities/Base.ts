import { EntityType } from ".";

export interface Base<T extends EntityType> {
  type: T;
  id: string;
  createdAt: number;
  updatedAt: number;
}
