import * as join from "url-join";
import { endpoints } from "../../../shared/api/endpoint";
import { EntityObject, EntityType } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { SearchParams } from "../../../shared/api/request/search";
import { EntityStore } from "../../../shared/api/response/entity";
import { SearchResult } from "../../../shared/api/response/search";
import { stringifySearchParams } from "../request/search";
import { request } from "./request";

export const getCurrentUser = () => {
  return request<EntityStore>("GET", "user");
};

export const getCurrentUserConfig = () => {
  return request<EntityStore>("GET", "user/config");
};

export const getCurrentUserSessions = () => {
  return request<EntityStore>("GET", "user/sessions");
};

export const getEntity = (entityType: EntityType, entityId: string) => {
  return request<EntityStore>("GET", join(endpoints[entityType], entityId));
};

export const createEntity = <E extends EntityObject>(params: SaveParams<E>) => {
  return request<EntityStore>("POST", endpoints[params.type], params);
};

export const updateEntity = <E extends EntityObject>(params: SaveParams<E>) => {
  return request<EntityStore>("PATCH", join(endpoints[params.type], params.id), params);
};

export const deleteEntity = (entityType: EntityType, entityId: string) => {
  return request<EntityStore>("DELETE", join(endpoints[entityType], entityId));
};

export const searchEntity = <E extends EntityObject>(params: SearchParams<E>) => {
  const query = stringifySearchParams(params);

  return request<SearchResult>("GET", join(endpoints[params.type], `?${query}`));
};
