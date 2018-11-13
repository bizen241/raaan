import { EntityObject } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";

export const stringifySearchParams = <E extends EntityObject>(params: SearchParams<E>) => {
  const urlSearchParams = new URLSearchParams(params);

  urlSearchParams.sort();

  return urlSearchParams.toString();
};
