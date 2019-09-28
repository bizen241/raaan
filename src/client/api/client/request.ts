import ky from "ky";
import { EntityObject } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";

type Method = "get" | "post" | "put" | "patch" | "delete";

export const request = async <T>(method: Method, path: string, body?: Params<EntityObject>) => {
  const response = (await ky(path, {
    method,
    prefixUrl: `${location.origin}/api`,
    credentials: "include",
    headers: {
      "X-Requested-With": "Fetch"
    },
    json: body
  }).json()) as T;

  return response;
};
