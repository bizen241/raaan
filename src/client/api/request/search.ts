import { EntityObject } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";

export const stringifyParams = <E extends EntityObject>(params: Params<E>, excludePaginationParams?: boolean) => {
  const urlSearchParams = new URLSearchParams();

  const keys = Object.keys(params) as Array<keyof Params<E>>;

  keys.forEach((key) => {
    const value = params[key];
    if (value === undefined) {
      return;
    }

    if (excludePaginationParams && (key === "searchLimit" || key === "searchOffset")) {
      return;
    }

    urlSearchParams.set(key as any, value as any);
  });

  urlSearchParams.sort();

  return urlSearchParams.toString();
};
