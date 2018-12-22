import { EntityType } from "../../../../shared/api/entities";
import { createEntityStore } from "../../../../shared/api/response/entity";
import { createSearchResultStore, mergeSearchResultStore } from "../search";

test("merge SearchResultStore", () => {
  const query = "";
  fetch("").then(response => response.json);

  const entityType: EntityType = "User";
  const searchResultStore = createSearchResultStore();

  searchResultStore[entityType] = {
    [query]: {
      pages: {
        2: []
      },
      count: 100,
      fetchedAt: new Date().valueOf()
    }
  };

  const mergedSearchResultMap = mergeSearchResultStore(
    searchResultStore,
    entityType,
    {
      page: 1
    },
    {
      ids: [],
      count: 0,
      entities: createEntityStore()
    }
  );

  const mergedSearchResult = mergedSearchResultMap[entityType][query];

  expect(mergedSearchResult && mergedSearchResult.pages[1]).toBeDefined();
  expect(mergedSearchResult && mergedSearchResult.pages[2]).toBeUndefined();
});
