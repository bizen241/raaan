import { EntityObject } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";
import { SearchResult } from "../../../shared/api/response/search";

export interface SearchResultEntry {
  pages: {
    [page: number]: string[] | undefined;
  };
  count: number;
  fetchedAt: number;
  isDownloaded?: boolean;
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

const isSearchResultConflicted = <E extends EntityObject>(
  entry: SearchResultEntry,
  params: SearchParams<E>,
  result: SearchResult
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
  params: SearchParams<E>,
  result: SearchResult
): SearchResultStore => {
  const query = getQueryString(params);
  const entry = store[query];
  const { ids, count } = result;

  const pages = entry && isSearchResultConflicted(entry, params, result) ? undefined : entry && entry.pages;

  return {
    ...store,
    [query]: {
      pages: {
        ...pages,
        [params.page]: ids
      },
      count,
      fetchedAt: new Date().valueOf()
    }
  };
};
