/**
 * @format uuid
 */
export type UUID = string;

export interface BaseEntityObject {
  id: UUID;
  createdAt: number;
  updatedAt: number;
  fetchedAt: number;
  searchLimit?: number;
  searchOffset?: number;
  searchOrder?: "ASC" | "DESC";
}
