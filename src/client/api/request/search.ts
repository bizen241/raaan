import { EntityObject } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";

export const stringifySearchParams = <E extends EntityObject>(
  params: SearchParams<E>,
  excludePaginationParams?: boolean
) => {
  const urlSearchParams = new URLSearchParams(params as any);

  if (excludePaginationParams) {
    const limit: keyof SearchParams<E> = "limit";
    const offset: keyof SearchParams<E> = "offset";

    urlSearchParams.delete(limit);
    urlSearchParams.delete(offset);
  }

  urlSearchParams.sort();

  return urlSearchParams.toString();
};
