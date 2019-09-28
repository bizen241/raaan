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
  update: <E extends EntityObject>(
    method: keyof ApiState,
    type: EntityType,
    key: string | Params<E>,
    code: number,
    response?: Partial<EntityStore>
  ) => createAction(ApiActionType.Update, { method, type, key, code, response })
};

export type ApiActions = ActionUnion<typeof apiSyncActions>;

const getEntity = (type: EntityType, id: string): AsyncAction => async dispatch => {
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

const searchEntity = <E extends EntityObject>(type: EntityType, params: Params<E>): AsyncAction => async dispatch => {
  dispatch(apiSyncActions.update<E>("search", type, params, 102));

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

const uploadEntity = <E extends EntityObject>(type: EntityType, id: string, params?: Params<E>): AsyncAction => async (
  dispatch,
  getState
) => {
  const buffer = getState().buffers[type][id];
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
  } catch (e) {
    const code = e instanceof HTTPError ? e.response.status : 500;

    dispatch(apiSyncActions.update("upload", type, id, code));
  }
};

const deleteEntity = (type: EntityType, id: string): AsyncAction => async dispatch => {
  dispatch(apiSyncActions.update("delete", type, id, 102));

  try {
    const response = await api.deleteEntity(type, id);

    dispatch(cacheActions.get(response));
    dispatch(buffersActions.delete(type, id));
    dispatch(apiSyncActions.update("delete", type, id, 200, response));
  } catch (e) {
    const code = e instanceof HTTPError ? e.response.status : 500;

    dispatch(apiSyncActions.update("delete", type, id, code));
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
