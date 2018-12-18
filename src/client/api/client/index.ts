import * as join from "url-join";
import { endpoints } from "../../../shared/api/endpoint";
import { EntityObject, EntityType } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { SearchParams } from "../../../shared/api/request/search";
import { EntityStore } from "../../../shared/api/response/entity";
import { SearchResponse } from "../../../shared/api/response/search";
import { stringifySearchParams } from "../request/search";
import { request } from "./request";

export const getCurrentUser = () => {
  return request<EntityStore>("GET", "user");
};

export const getEntity = (entityType: EntityType, entityId: string) => {
  return request<EntityStore>("GET", join(endpoints[entityType], entityId));
};

export const createEntity = <E extends EntityObject>(entityType: EntityType, params: SaveParams<E>) => {
  return request<EntityStore>("POST", endpoints[entityType], params);
};

export const updateEntity = <E extends EntityObject>(entityType: EntityType, id: string, params: SaveParams<E>) => {
  return request<EntityStore>("PATCH", join(endpoints[entityType], id), params);
};

export const deleteEntity = (entityType: EntityType, entityId: string) => {
  return request<EntityStore>("DELETE", join(endpoints[entityType], entityId));
};

export const searchEntity = <E extends EntityObject>(entityType: EntityType, params: SearchParams<E>) => {
  const query = stringifySearchParams(params);

  return request<SearchResponse>("GET", join(endpoints[entityType], `?${query}`));
};
