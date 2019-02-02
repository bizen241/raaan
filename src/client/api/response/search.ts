import { EntityObject, EntityType } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";
import { SearchResponse } from "../../../shared/api/response/search";

export interface SearchResult {
  pages: {
    [page: number]: string[] | undefined;
  };
  count: number;
  fetchedAt: number;
  isDownloaded?: boolean;
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

  const page: keyof Pick<SearchParams<E>, "page"> = "page";

  urlSearchParams.delete(page);
  urlSearchParams.sort();

  return urlSearchParams.toString();
};

const isSearchResultConflicted = <E extends EntityObject>(
  entry: SearchResult,
  params: SearchParams<E>,
  result: SearchResponse
) => {
  if (result.count !== entry.count) {
    return true;
  }

  const pages = { ...entry.pages };
  pages[params.page] = undefined;

  const resultIds = result.ids;

  for (const page of Object.values(pages)) {
    if (page === undefined) {
      return;
    }

    for (const entityId of page) {
      const isConflicted = resultIds.includes(entityId);

      if (isConflicted) {
        return true;
      }
    }
  }

  return false;
};

export const mergeSearchResultStore = <E extends EntityObject>(
  store: SearchResultStore,
  entityType: EntityType,
  params: SearchParams<E>,
  response: SearchResponse
): SearchResultStore => {
  const query = getQueryString(params);
  const map = store[entityType];
  const target = map[query];
  const { ids, count } = response;

  const pages = target && isSearchResultConflicted(target, params, response) ? undefined : target && target.pages;

  return {
    ...store,
    [entityType]: {
      ...map,
      [query]: {
        pages: {
          ...pages,
          [params.page]: ids
        },
        count,
        fetchedAt: new Date().valueOf()
      }
    }
  };
};
