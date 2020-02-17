export interface BaseEntityObject {
  createdAt: number;
  updatedAt: number;
  fetchedAt: number;
  searchLimit?: number;
  searchOffset?: number;
  searchOrder?: "ASC" | "DESC";
}
