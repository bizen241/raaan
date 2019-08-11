import { EntityObject } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";

export const stringifySearchParams = <E extends EntityObject>(
  params: SearchParams<E>,
  excludePaginationParams?: boolean
) => {
  const urlSearchParams = new URLSearchParams();

  const keys = Object.keys(params) as Array<keyof SearchParams<E>>;

  keys.forEach(key => {
    const value = params[key];
    if (value === undefined) {
      return;
    }

    if (excludePaginationParams && (key === "limit" || key === "offset")) {
      return;
    }

    urlSearchParams.set(key as any, value as any);
  });

  urlSearchParams.sort();

  return urlSearchParams.toString();
};
