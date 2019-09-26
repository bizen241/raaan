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
  searchSort?: string;
  searchOrder?: "ASC" | "DESC";
}
