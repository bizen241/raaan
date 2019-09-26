import { EntityObject } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const request = async <T>(method: Method, path: string, body?: Params<EntityObject>) => {
  const url = `${location.origin}/api/${path}`;

  const response = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "Fetch"
    }
  }).catch(() => {
    throw new Error();
  });

  if (!response.ok) {
    throw new FetchError(response.status);
  }

  const json = await response.json().catch(() => {
    throw new Error();
  });

  return json as T;
};

export class FetchError extends Error {
  code: number;

  constructor(code: number) {
    super();

    this.code = code;
  }
}
