import { endpoints } from "../../../shared/api/endpoint";
import { EntityType } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { SearchParams } from "../../../shared/api/request/search";
import { EntityStore } from "../../../shared/api/response/get";
import { SearchResponse } from "../../../shared/api/response/search";
import { stringifySearchParams } from "../request/search";
import { request } from "./request";

export const getCurrentUser = () => {
  return request<EntityStore>("GET", "user");
};

export const getEntity = (entityType: EntityType, entityId: string) => {
  return request<EntityStore>("GET", `${endpoints[entityType]}/${entityId}`);
};

export const createEntity = (entityType: EntityType, params: SaveParams<any>) => {
  return request<EntityStore>("POST", endpoints[entityType], params);
};

export const updateEntity = (entityType: EntityType, id: string, params: SaveParams<any>) => {
  return request<EntityStore>("PATCH", `${endpoints[entityType]}/${id}`, params);
};

export const deleteEntity = (entityType: EntityType, entityId: string) => {
  return request<EntityStore>("DELETE", `${endpoints[entityType]}/${entityId}`);
};

export const searchEntity = (entityType: EntityType, params: SearchParams<any>) => {
  const query = stringifySearchParams(params);

  return request<SearchResponse>("GET", `${endpoints[entityType]}?${query}`);
};
