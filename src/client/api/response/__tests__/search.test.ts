import { strict as assert } from "assert";
import { EntityType } from "../../../../shared/api/entities";
import { createEntityStore } from "../../../../shared/api/response/get";
import { createSearchResultStore, mergeSearchResultStore } from "../search";

test("merge SearchResultStore", () => {
  const query = "";

  const entityType: EntityType = "User";
  const searchResultStore = createSearchResultStore();

  searchResultStore[entityType] = {
    [query]: {
      ids: {},
      count: 100,
      fetchedAt: new Date().valueOf()
    }
  };

  const mergedSearchResultMap = mergeSearchResultStore(
    searchResultStore,
    entityType,
    {
      limit: 10,
      offset: 0
    },
    {
      ids: [],
      count: 0,
      entities: createEntityStore()
    }
  );

  const mergedSearchResult = mergedSearchResultMap[entityType][query];

  assert(mergedSearchResult && mergedSearchResult.ids);
});
