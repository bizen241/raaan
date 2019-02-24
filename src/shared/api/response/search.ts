import { EntityStore } from "./get";

export interface SearchResponse {
  ids: string[];
  entities: EntityStore;
  count: number;
}
