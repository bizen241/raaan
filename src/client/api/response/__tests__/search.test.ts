import { createEntityStore } from "../../../../shared/api/response/entity";
import { mergeSearchResultStore, SearchResultStore } from "../search";

test("merge search result", () => {
  const query = "type=User";

  const searchResultStore: SearchResultStore = {
    [query]: {
      pages: {
        2: {
          ids: [],
          next: null
        }
      },
      fetchedAt: new Date().valueOf()
    }
  };

  const mergedSearchResultStore = mergeSearchResultStore(
    searchResultStore,
    {
      type: "User",
      page: 1
    },
    {
      ids: [],
      next: null,
      entities: createEntityStore()
    }
  );

  const mergedSearchEntry = mergedSearchResultStore[query];

  expect(mergedSearchEntry && mergedSearchEntry.pages[1]).toBeDefined();
  expect(mergedSearchEntry && mergedSearchEntry.pages[2]).toBeDefined();
});
