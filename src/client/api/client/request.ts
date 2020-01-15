import ky from "ky";
import { EntityObject } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { apiVersion } from "../../../shared/api/version";

type Method = "get" | "post" | "put" | "patch" | "delete";

export const request = async <T>(method: Method, path: string, body?: Params<EntityObject>) => {
  const response = await ky(path, {
    method,
    prefixUrl: `${location.origin}/api`,
    credentials: "include",
    headers: {
      "X-Requested-With": "Fetch",
      "X-Api-Version": apiVersion.toString()
    },
    json: body
  });

  const serverApiVersion = Number(response.headers.get("X-Api-Version"));
  if (serverApiVersion !== apiVersion) {
    location.reload();
  }

  const json = (await response.json()) as T;

  return json;
};
