import { EntityObject } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";
import { SearchResult } from "../../../shared/api/response/search";

export interface SearchResultPage {
  ids: string[];
  hasNextPage: boolean;
}

export interface SearchResultEntry {
  pages: {
    [page: number]: SearchResultPage | undefined;
  };
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

const isSearchResultEntryOutdated = <E extends EntityObject>(
  entry: SearchResultEntry,
  params: SearchParams<E>,
  result: SearchResult
) => {
  const pages = { ...entry.pages };
  pages[params.page] = undefined;

  const resultIds = result.ids;

  for (const page of Object.values(pages)) {
    if (page === undefined) {
      return;
    }

    for (const entityId of page.ids) {
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
  const pages =
    entry === undefined ? undefined : isSearchResultEntryOutdated(entry, params, result) ? undefined : entry.pages;

  const { ids, hasNextPage } = result;

  return {
    ...store,
    [query]: {
      pages: {
        ...pages,
        [params.page]: {
          ids,
          hasNextPage
        }
      },
      fetchedAt: new Date().valueOf()
    }
  };
};
