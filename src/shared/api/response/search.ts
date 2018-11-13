import { EntityStore } from "./entity";

export const entityCountPerPage = 10;

export interface SearchResult {
  ids: string[];
  prev: string | null;
  next: string | null;
  entities: EntityStore;
}
