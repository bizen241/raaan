import * as join from "url-join";
import { EntityType } from "../../../shared/api/entities";
import { EntityStore } from "../../../shared/api/response/entity";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const entityTypeToEndpoint: { [P in EntityType]: string } = {
  Account: "accounts",
  Session: "sessions",
  User: "users"
};

const request = async <T>(method: Method, entityType: EntityType, path: string) => {
  const endpoint = entityTypeToEndpoint[entityType];
  const url = join(location.origin, "api", endpoint, path);

  const response = await fetch(url, {
    method,
    credentials: "include"
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

export const getEntity = (entityType: EntityType, entityId: string) => {
  return request<EntityStore>("GET", entityType, entityId);
};
