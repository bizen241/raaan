import { createEntityStore } from "../../../../shared/api/response/entity";
import { mergeSearchResultMap, SearchResultMap } from "../search";

test("merge search result", () => {
  const query = "type=User";

  const searchResultMap: SearchResultMap = {
    [query]: {
      pages: {
        2: []
      },
      count: 100,
      fetchedAt: new Date().valueOf()
    }
  };

  const mergedSearchResultMap = mergeSearchResultMap(
    searchResultMap,
    {
      page: 1
    },
    {
      ids: [],
      count: 0,
      entities: createEntityStore()
    }
  );

  const mergedSearchResult = mergedSearchResultMap[query];

  expect(mergedSearchResult && mergedSearchResult.pages[1]).toBeDefined();
  expect(mergedSearchResult && mergedSearchResult.pages[2]).toBeUndefined();
});
