import { EntityObject, EntityType } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";
import { SearchResponse } from "../../../shared/api/response/search";

export interface SearchResult {
  ids: Array<string | undefined | null>;
  count: number;
  fetchedAt: number;
}

export interface SearchResultMap {
  [query: string]: SearchResult | undefined;
}

export type SearchResultStore = { [P in EntityType]: SearchResultMap };

export const createSearchResultStore = (): SearchResultStore => ({
  Content: {},
  ContentRevision: {},
  ContentTag: {},
  User: {},
  UserAccount: {},
  UserConfig: {},
  UserSession: {}
});

const getQueryString = <E extends EntityObject>(params: SearchParams<E>) => {
  const urlSearchParams = new URLSearchParams(params as any);

  const limit: keyof SearchParams<E> = "limit";
  const offset: keyof SearchParams<E> = "offset";

  urlSearchParams.delete(limit);
  urlSearchParams.delete(offset);
  urlSearchParams.sort();

  return urlSearchParams.toString();
};

const isMergeable = (target: SearchResult, source: SearchResponse) => {
  if (target.count !== source.count) {
    return false;
  }

  return !source.ids.some(id => target.ids.includes(id));
};

export const mergeSearchResultStore = <E extends EntityObject>(
  store: SearchResultStore,
  entityType: EntityType,
  params: SearchParams<E>,
  response: SearchResponse
): SearchResultStore => {
  const searchQueryString = getQueryString(params);
  const searchResultMap = store[entityType];

  const target = searchResultMap[searchQueryString];

  const targetIds = target && isMergeable(target, response) ? [...target.ids] : [];
  const { limit, offset } = params;
  const ids = targetIds.splice(offset, limit, ...response.ids);

  return {
    ...store,
    [entityType]: {
      ...searchResultMap,
      [searchQueryString]: {
        ids,
        count: response.count,
        fetchedAt: Date.now()
      }
    }
  };
};
