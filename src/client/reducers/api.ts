import ky from "ky";
import { Reducer } from "redux";
import { Actions } from ".";
import { createEntityTypeToObject, EntityId, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { EntityStore } from "../../shared/api/response/get";
import * as api from "../api/client";
import { stringifyParams } from "../api/request/search";
import { ActionUnion, AsyncAction, createAction } from "./action";
import { buffersActions } from "./buffers";
import { cacheActions } from "./cache";

export enum ApiActionType {
  Update = "api/update",
}

export const apiSyncActions = {
  update: (params: { entityType: EntityType; method: keyof ApiState; key: string; code: number }) =>
    createAction(ApiActionType.Update, params),
};

export type ApiActions = ActionUnion<typeof apiSyncActions>;

const getEntity = <T extends EntityType>(entityType: T, entityId: EntityId<T>): AsyncAction => async (
  dispatch,
  getState
) => {
  const currentCode = getState().api.get[entityType][entityId];
  if (currentCode === 102) {
    return;
  }

  dispatch(
    apiSyncActions.update({
      entityType,
      method: "get",
      key: entityId,
      code: 102,
    })
  );

  try {
    const response = await api.getEntity(entityType, entityId);

    dispatch(cacheActions.get(response));
    dispatch(
      apiSyncActions.update({
        entityType,
        method: "get",
        key: entityId,
        code: 200,
      })
    );
  } catch (e) {
    const code = e instanceof ky.HTTPError ? e.response.status : 500;

    dispatch(
      apiSyncActions.update({
        entityType,
        method: "get",
        key: entityId,
        code,
      })
    );
  }
};

const searchEntity = <T extends EntityType>(
  entityType: T,
  entityParams: Params<EntityTypeToEntity[T]>,
  onSuccess?: () => void
): AsyncAction => async (dispatch, getState) => {
  const key = stringifyParams(entityParams);

  const currentCode = getState().api.search[entityType][key];
  if (currentCode === 102) {
    return;
  }

  dispatch(
    apiSyncActions.update({
      entityType,
      method: "search",
      key,
      code: 102,
    })
  );

  try {
    const response = await api.searchEntity(entityType, entityParams);

    dispatch(cacheActions.search(entityType, entityParams, response));
    dispatch(
      apiSyncActions.update({
        entityType,
        method: "search",
        key,
        code: 200,
      })
    );

    if (onSuccess !== undefined) {
      onSuccess();
    }
  } catch (e) {
    const code = e instanceof ky.HTTPError ? e.response.status : 500;

    dispatch(
      apiSyncActions.update({
        entityType,
        method: "search",
        key,
        code,
      })
    );
  }
};

export const isLocalOnly = (id: string) => !isNaN(Number(id));

const uploadEntity = <T extends EntityType>(
  entityType: T,
  entityId: EntityId<T>,
  entityParams?: Params<EntityTypeToEntity[T]>,
  onSuccess?: (uploadResponse: EntityStore) => void,
  onFailure?: () => void
): AsyncAction => async (dispatch, getState) => {
  const entityBuffer = getState().buffers[entityType][entityId] as Params<EntityTypeToEntity[T]> | undefined;
  const target = entityParams || entityBuffer;
  if (target === undefined) {
    return;
  }

  dispatch(
    apiSyncActions.update({
      entityType,
      method: "upload",
      key: entityId,
      code: 102,
    })
  );

  try {
    const response = isLocalOnly(entityId)
      ? await api.createEntity(entityType, target)
      : await api.updateEntity(entityType, entityId, target);

    dispatch(cacheActions.get(response));
    dispatch(
      apiSyncActions.update({
        entityType,
        method: "upload",
        key: entityId,
        code: 200,
      })
    );

    if (entityParams === undefined && entityBuffer !== undefined) {
      dispatch(buffersActions.delete(entityType, entityId));
    }

    if (onSuccess !== undefined) {
      onSuccess({ ...createEntityTypeToObject(), ...response });
    }
  } catch (e) {
    const code = e instanceof ky.HTTPError ? e.response.status : 500;

    dispatch(
      apiSyncActions.update({
        entityType,
        method: "upload",
        key: entityId,
        code,
      })
    );

    if (onFailure !== undefined) {
      onFailure();
    }
  }
};

const deleteEntity = <T extends EntityType>(
  entityType: T,
  entityId: EntityId<T>,
  timeout?: number,
  onSuccess?: () => void,
  onFailure?: () => void
): AsyncAction => async (dispatch) => {
  dispatch(
    apiSyncActions.update({
      entityType,
      method: "delete",
      key: entityId,
      code: 102,
    })
  );

  try {
    const response = await api.deleteEntity(entityType, entityId);

    dispatch(cacheActions.get(response));
    dispatch(buffersActions.delete(entityType, entityId));
    dispatch(
      apiSyncActions.update({
        entityType,
        method: "delete",
        key: entityId,
        code: 200,
      })
    );

    if (onSuccess !== undefined) {
      onSuccess();
    }

    setTimeout(() => dispatch(cacheActions.purge(entityType, entityId)), timeout);
  } catch (e) {
    const code = e instanceof ky.HTTPError ? e.response.status : 500;

    dispatch(
      apiSyncActions.update({
        entityType,
        method: "delete",
        key: entityId,
        code,
      })
    );

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
  delete: deleteEntity,
};

type StatusMap = {
  [P in keyof EntityTypeToEntity]: {
    [key: string]: number | undefined;
  };
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
  delete: createEntityTypeToObject(),
};

export const apiReducer: Reducer<ApiState, Actions> = (state = initialApiState, action) => {
  switch (action.type) {
    case ApiActionType.Update: {
      const { entityType, method, key, code } = action.payload;

      return {
        ...state,
        [method]: {
          ...state[method],
          [entityType]: {
            ...state[method][entityType],
            [key]: code,
          },
        },
      };
    }
    default:
      return state;
  }
};
