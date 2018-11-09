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
