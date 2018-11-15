import * as join from "url-join";
import { SaveParams } from "../../../shared/api/request/save";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const request = async <T>(method: Method, path: string, body?: SaveParams<any>) => {
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
