import { EntityObject } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";
import { SearchResult } from "../../../shared/api/response/search";

export interface SearchResultPage {
  ids: string[];
  prev: string | null;
  next: string | null;
  createdAt: number;
}

export interface SearchResultEntry {
  [page: number]: SearchResultPage | undefined;
}

export interface SearchResultStore {
  [query: string]: SearchResultEntry | undefined;
}

const getQueryString = <E extends EntityObject>(params: SearchParams<E>) => {
  const urlSearchParams = new URLSearchParams(params);

  const page: keyof Pick<SearchParams<E>, "page"> = "page";

  urlSearchParams.delete(page);
  urlSearchParams.sort();

  return urlSearchParams.toString();
};

export const getSearchResultEntry = <E extends EntityObject>(store: SearchResultStore, params: SearchParams<E>) => {
  const query = getQueryString(params);

  return store[query];
};

const setSearchResultEntry = <E extends EntityObject>(
  store: SearchResultStore,
  entry: SearchResultEntry,
  params: SearchParams<E>
) => {
  const query = getQueryString(params);

  store[query] = entry;
};

export const mergeSearchResult = <E extends EntityObject>(
  store: SearchResultStore,
  result: SearchResult,
  params: SearchParams<E>
): SearchResultStore => {
  const { page: pageNumber } = params;
  const { ids, prev, next } = result;

  const page: SearchResultPage = {
    ids,
    prev,
    next,
    createdAt: new Date().valueOf()
  };

  const entry: SearchResultEntry = {
    ...getSearchResultEntry(store, params),
    [pageNumber]: page
  };

  const prevPage = entry[pageNumber - 1];
  if (prevPage !== undefined && prevPage) {
    console.log("hoge");
  }

  const nextPage = entry[pageNumber + 1];
  if (nextPage !== undefined) {
    console.log("fuga");
  }

  const mergedStore = { ...store };

  setSearchResultEntry(store, entry, params);

  return mergedStore;
};
