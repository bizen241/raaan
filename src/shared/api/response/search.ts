import { EntityStore } from "./get";

export const entityCountPerPage = 10;

export interface SearchResponse {
  ids: string[];
  entities: EntityStore;
  count: number;
}
