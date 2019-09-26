import { strict as assert } from "assert";
import { createEntityTypeToObject, EntityType } from "../../../../shared/api/entities";
import { mergeSearchResultStore, SearchResultStore } from "../search";

test("merge SearchResultStore", () => {
  const query = "";

  const entityType: EntityType = "User";
  const searchResultStore: SearchResultStore = createEntityTypeToObject();

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
      searchLimit: 10,
      searchOffset: 0
    },
    {
      ids: [],
      count: 0,
      entities: createEntityTypeToObject()
    }
  );

  const mergedSearchResult = mergedSearchResultMap[entityType][query];

  assert(mergedSearchResult && mergedSearchResult.ids);
});
