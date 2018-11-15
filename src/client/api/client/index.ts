import * as join from "url-join";
import { endpoints } from "../../../shared/api/endpoint";
import { EntityObject, EntityType } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { SearchParams } from "../../../shared/api/request/search";
import { EntityStore } from "../../../shared/api/response/entity";
import { SearchResult } from "../../../shared/api/response/search";
import { stringifySearchParams } from "../request/search";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const request = async <T>(method: Method, path: string, body?: SaveParams<any>) => {
  const url = join(location.origin, "api", path);

  const response = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  }).catch(() => {
    throw new Error();
  });

  if (!response.ok) {
    throw new Error();
  }

  const json = await response.json().catch(() => {
    throw new Error();
  });

  return json as T;
};

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
