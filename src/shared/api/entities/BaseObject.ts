import { EntityType } from ".";

export interface BaseObject<T extends EntityType> {
  type: T;
  id: string;
  createdAt: number;
  updatedAt: number;
  fetchedAt: number;
  isDownloaded?: boolean;
}
