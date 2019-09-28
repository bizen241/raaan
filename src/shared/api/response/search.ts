import { EntityStore } from "./get";

export interface SearchResponse {
  ids: string[];
  entities: Partial<EntityStore>;
  count: number;
}
