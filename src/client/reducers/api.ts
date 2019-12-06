import { LOCATION_CHANGE } from "connected-react-router";
import { HTTPError } from "ky";
import { Reducer } from "redux";
import { Actions } from ".";
import {
  createEntityTypeToObject,
  EntityObject,
  EntityType,
  EntityTypeToEntity,
  mergeEntityTypeToObject
} from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { EntityStore } from "../../shared/api/response/get";
import * as api from "../api/client";
import { stringifyParams } from "../api/request/search";
import { ActionUnion, AsyncAction, createAction } from "./action";
import { buffersActions } from "./buffers";
import { cacheActions } from "./cache";

export enum ApiActionType {
  Update = "api/update"
}

export const apiSyncActions = {
  update: <T extends EntityType>(
    method: keyof ApiState,
    type: T,
    key: string | Params<EntityTypeToEntity[T]>,
    code: number,
    response?: Partial<EntityStore>
  ) => createAction(ApiActionType.Update, { method, type, key, code, response })
};

export type ApiActions = ActionUnion<typeof apiSyncActions>;

const getEntity = (type: EntityType, id: string): AsyncAction => async (dispatch, getState) => {
  const state = getState().api.get[type][id];
  if (state && state.code === 102) {
    return;
  }

  dispatch(apiSyncActions.update("get", type, id, 102));

  try {
    const response = await api.getEntity(type, id);

    dispatch(cacheActions.get(response));
    dispatch(apiSyncActions.update("get", type, id, 200, response));
  } catch (e) {
    const code = e instanceof HTTPError ? e.response.status : 500;

    dispatch(apiSyncActions.update("get", type, id, code));
  }
};

const searchEntity = <T extends EntityType>(type: T, params: Params<EntityTypeToEntity[T]>): AsyncAction => async (
  dispatch,
  getState
) => {
  const state = getState().api.search[type][stringifyParams(params)];
  if (state && state.code === 102) {
    return;
  }

  dispatch(apiSyncActions.update<T>("search", type, params, 102));

  try {
    const response = await api.searchEntity(type, params);

    dispatch(cacheActions.search(type, params, response));
    dispatch(apiSyncActions.update("search", type, params, 200, response.entities));
  } catch (e) {
    const code = e instanceof HTTPError ? e.response.status : 500;

    dispatch(apiSyncActions.update("search", type, params, code));
  }
};

export const isLocalOnly = (id: string) => !isNaN(Number(id));

const uploadEntity = <T extends EntityType>(
  type: T,
  id: string,
  params?: Params<EntityTypeToEntity[T]>,
  onSuccess?: (uploadResponse: EntityStore) => void,
  onFailure?: () => void
): AsyncAction => async (dispatch, getState) => {
  const buffer = getState().buffers[type][id] as Partial<EntityTypeToEntity[T]> | undefined;
  const target = params || buffer;
  if (target === undefined) {
    return;
  }

  dispatch(apiSyncActions.update("upload", type, id, 102));

  try {
    const response = isLocalOnly(id) ? await api.createEntity(type, target) : await api.updateEntity(type, id, target);

    dispatch(cacheActions.get(response));
    dispatch(apiSyncActions.update("upload", type, id, 200, response));

    if (params === undefined && buffer !== undefined) {
      dispatch(buffersActions.delete(type, id));
    }

    if (onSuccess !== undefined) {
      onSuccess({ ...createEntityTypeToObject(), ...response });
    }
  } catch (e) {
    const code = e instanceof HTTPError ? e.response.status : 500;

    dispatch(apiSyncActions.update("upload", type, id, code));

    if (onFailure !== undefined) {
      onFailure();
    }
  }
};

const deleteEntity = (
  type: EntityType,
  id: string,
  timeout?: number,
  onSuccess?: () => void,
  onFailure?: () => void
): AsyncAction => async dispatch => {
  dispatch(apiSyncActions.update("delete", type, id, 102));

  try {
    const response = await api.deleteEntity(type, id);

    dispatch(cacheActions.get(response));
    dispatch(buffersActions.delete(type, id));
    dispatch(apiSyncActions.update("delete", type, id, 200, response));

    if (onSuccess !== undefined) {
      onSuccess();
    }

    setTimeout(() => dispatch(cacheActions.purge(type, id)), timeout);
  } catch (e) {
    const code = e instanceof HTTPError ? e.response.status : 500;

    dispatch(apiSyncActions.update("delete", type, id, code));

    if (onFailure !== undefined) {
      onFailure();
    }
  }
};

export const apiActions = {
  ...apiSyncActions,
  get: getEntity,
  search: searchEntity,
  upload: uploadEntity,
  delete: deleteEntity
};

type StatusMap = {
  [P in keyof EntityTypeToEntity]: {
    [key: string]:
      | {
          code: number;
          response?: EntityStore;
        }
      | undefined;
  }
};

export type ApiState = {
  get: StatusMap;
  search: StatusMap;
  upload: StatusMap;
  delete: StatusMap;
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
      const { method, type, key, code, response } = action.payload;

      const keyString = typeof key === "string" ? key : stringifyParams<EntityObject>(key);

      return {
        ...state,
        [method]: {
          ...state[method],
          [type]: {
            ...state[method][type],
            [keyString]: {
              code,
              response: response && mergeEntityTypeToObject(response)
            }
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
