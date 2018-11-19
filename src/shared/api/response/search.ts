import { EntityStore } from "./entity";

export const entityCountPerPage = 10;

export interface SearchResult {
  ids: string[];
  entities: EntityStore;
  hasNextPage: boolean;
}
