import { LOCATION_CHANGE } from "connected-react-router";
import { Reducer } from "redux";
import { Actions } from ".";
import { createEntityTypeToObject, EntityObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { SearchParams } from "../../shared/api/request/search";
import * as api from "../api/client";
import { stringifySearchParams } from "../api/request/search";
import { ActionUnion, AsyncAction, createAction } from "./action";
import { buffersActions } from "./buffers";
import { cacheActions } from "./cache";

export enum ApiActionType {
  Update = "api/Update"
}

type Key<E extends EntityObject> = string | SearchParams<E>;

export const apiSyncActions = {
  update: <E extends EntityObject>(method: keyof ApiState, type: EntityType, key: Key<E>, code: number) =>
    createAction(ApiActionType.Update, { method, type, key, code })
};

export type ApiActions = ActionUnion<typeof apiSyncActions>;

const getEntity = (type: EntityType, id: string): AsyncAction => async dispatch => {
  dispatch(apiSyncActions.update("get", type, id, 102));

  try {
    const result = await api.getEntity(type, id);

    dispatch(cacheActions.get(result));
    dispatch(apiSyncActions.update("get", type, id, 200));
  } catch (e) {
    dispatch(apiSyncActions.update("get", type, id, 404));
  }
};

const searchEntity = <E extends EntityObject>(
  type: EntityType,
  params: SearchParams<E>
): AsyncAction => async dispatch => {
  dispatch(apiSyncActions.update("search", type, params, 102));

  try {
    const result = await api.searchEntity(type, params);

    dispatch(cacheActions.search(type, params, result));
    dispatch(apiSyncActions.update("search", type, params, 200));
  } catch (e) {
    dispatch(apiSyncActions.update("search", type, params, 404));
  }
};

export const isLocalOnly = (id: string) => !isNaN(Number(id));

const uploadEntity = (type: EntityType, id: string): AsyncAction => async (dispatch, getState) => {
  const buffer = getState().buffers[type][id];
  if (buffer === undefined) {
    return;
  }

  dispatch(apiSyncActions.update("upload", type, id, 102));

  try {
    const result = isLocalOnly(id) ? await api.createEntity(type, buffer) : await api.updateEntity(type, id, buffer);

    dispatch(cacheActions.get(result));
    dispatch(apiSyncActions.update("upload", type, id, 200));
    dispatch(buffersActions.delete(type, id));
  } catch (e) {
    dispatch(apiSyncActions.update("upload", type, id, 404));
  }
};

const deleteEntity = (type: EntityType, id: string): AsyncAction => async dispatch => {
  dispatch(apiSyncActions.update("delete", type, id, 102));

  try {
    await api.deleteEntity(type, id);

    dispatch(cacheActions.purge(type, id));
    dispatch(buffersActions.delete(type, id));
    dispatch(apiSyncActions.update("delete", type, id, 200));
  } catch (e) {
    dispatch(apiSyncActions.update("delete", type, id, 404));
  }
};

export const apiActions = {
  ...apiSyncActions,
  get: getEntity,
  search: searchEntity,
  upload: uploadEntity,
  delete: deleteEntity
};

type ResponseCodeMap = {
  [P in keyof EntityTypeToEntity]: {
    [key: string]: number | undefined;
  }
};

export type ApiState = {
  get: ResponseCodeMap;
  search: ResponseCodeMap;
  upload: ResponseCodeMap;
  delete: ResponseCodeMap;
};

export const initialApiState: ApiState = {
  get: createEntityTypeToObject(),
  search: createEntityTypeToObject(),
  upload: createEntityTypeToObject(),
  delete: createEntityTypeToObject()
};

export const apiReducer: Reducer<ApiState, Actions> = (state = initialApiState, action) => {
  switch (action.type) {
    case ApiActionType.Update: {
      const { method, type, key, code } = action.payload;

      const keyString = typeof key === "string" ? key : stringifySearchParams(key);

      return {
        ...state,
        [method]: {
          ...state[method],
          [type]: {
            ...state[method][type],
            [keyString]: code
          }
        }
      };
    }
    case LOCATION_CHANGE: {
      return initialApiState;
    }
    default:
      return state;
  }
};
