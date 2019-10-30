import { Reducer } from "redux";
import { createEntityTypeToObject, EntityObject, EntityType, mergeEntityTypeToObject } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { EntityStore } from "../../shared/api/response/get";
import { SearchResponse } from "../../shared/api/response/search";
import { stringifyParams } from "../api/request/search";
import { IdMap, mergeSearchResultStore, SearchResultMap, SearchResultStore } from "../api/response/search";
import { guestUser, guestUserConfig } from "../components/project/Context";
import { ActionUnion, createAction } from "./action";

export enum CacheActionType {
  Get = "cache/get",
  Search = "cache/search",
  Add = "cache/add",
  Purge = "cache/purge"
}

export const cacheActions = {
  get: (response: Partial<EntityStore>) =>
    createAction(CacheActionType.Get, {
      response
    }),
  search: <E extends EntityObject>(type: EntityType, params: Params<E>, response: SearchResponse) =>
    createAction(CacheActionType.Search, {
      type,
      params,
      response
    }),
  add: <E extends EntityObject>(type: EntityType, params: Params<E>, response: EntityStore) =>
    createAction(CacheActionType.Add, {
      type,
      params,
      response
    }),
  purge: (type: EntityType, id: string) =>
    createAction(CacheActionType.Purge, {
      type,
      id
    })
};

export type CacheActions = ActionUnion<typeof cacheActions>;

export type CacheState = {
  get: EntityStore;
  search: SearchResultStore;
};

export const initialCacheState: CacheState = {
  get: {
    ...createEntityTypeToObject(),
    User: {
      [guestUser.id]: guestUser
    },
    UserConfig: {
      [guestUserConfig.id]: guestUserConfig
    }
  },
  search: createEntityTypeToObject()
};

export const cacheReducer: Reducer<CacheState, CacheActions> = (state = initialCacheState, action) => {
  switch (action.type) {
    case CacheActionType.Get: {
      const { response } = action.payload;

      return {
        ...state,
        get: mergeEntityTypeToObject(state.get, response)
      };
    }
    case CacheActionType.Search: {
      const { type, params, response } = action.payload;

      return {
        get: mergeEntityTypeToObject(state.get, response.entities),
        search: mergeSearchResultStore<EntityObject>(state.search, type, params, response)
      };
    }
    case CacheActionType.Add: {
      const { type, params, response } = action.payload;

      const query = stringifyParams<EntityObject>(params, true);
      const result = state.search[type][query] || {
        ids: {},
        count: 0,
        fetchedAt: Date.now()
      };

      const createdAt = Object.values(response[type]).reduce(
        (prev, current: EntityObject) => Math.max(prev, current.createdAt),
        0
      );
      const target: EntityObject = Object.values(response[type]).find(
        (entity: EntityObject) => entity.createdAt === createdAt
      );

      return {
        get: state.get,
        search: mergeSearchResultStore<EntityObject>(state.search, type, params, {
          ids: [target.id, ...(Object.values(result.ids) as string[])],
          entities: {},
          count: result.count + 1
        })
      };
    }
    case CacheActionType.Purge: {
      const { type, id } = action.payload;

      const get = { ...state.get[type] };
      delete get[id];

      const search: SearchResultMap = {};
      Object.entries(state.search[type]).forEach(([key, result]) => {
        if (result === undefined) {
          return;
        }

        const targetIndex = Object.values(result.ids).indexOf(id);
        if (targetIndex === -1) {
          search[key] = result;
        } else {
          const ids: IdMap = {};
          Object.entries(result.ids).forEach(([indexString, entityId]) => {
            if (entityId === id) {
              return;
            }

            const index = Number(indexString);
            if (index > targetIndex) {
              ids[index - 1] = entityId;
            } else {
              ids[index] = entityId;
            }
          });

          search[key] = {
            ...result,
            ids,
            count: result.count - 1
          };
        }
      });

      return {
        get: {
          ...state.get,
          [type]: get
        },
        search: {
          ...state.search,
          [type]: search
        }
      };
    }
    default:
      return state;
  }
};
