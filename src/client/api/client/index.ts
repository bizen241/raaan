import { endpoints } from "../../../shared/api/endpoint";
import { EntityType, EntityTypeToEntity } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { EntityStore } from "../../../shared/api/response/get";
import { SearchResponse } from "../../../shared/api/response/search";
import { stringifyParams } from "../request/search";
import { request } from "./request";

export const getCurrentUser = () => {
  return request<Partial<EntityStore>>("get", "user");
};

export const deleteCurrentUser = () => {
  return request<Partial<EntityStore>>("delete", "user");
};

export const getEntity = (entityType: EntityType, entityId: string) => {
  return request<Partial<EntityStore>>("get", `${endpoints[entityType]}/${entityId}`);
};

export const createEntity = <T extends EntityType>(entityType: T, params: Params<EntityTypeToEntity[T]>) => {
  return request<Partial<EntityStore>>("post", endpoints[entityType], params);
};

export const updateEntity = <T extends EntityType>(
  entityType: T,
  id: string,
  params: Params<EntityTypeToEntity[T]>
) => {
  return request<Partial<EntityStore>>("patch", `${endpoints[entityType]}/${id}`, params);
};

export const deleteEntity = (entityType: EntityType, entityId: string) => {
  return request<Partial<EntityStore>>("delete", `${endpoints[entityType]}/${entityId}`);
};

export const searchEntity = <T extends EntityType>(entityType: T, params: Params<EntityTypeToEntity[T]>) => {
  const query = stringifyParams(params);

  return request<SearchResponse>("get", `${endpoints[entityType]}?${query}`);
};
