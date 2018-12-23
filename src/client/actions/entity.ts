import { EntityObject, EntityType } from "../../shared/api/entities";
import { SaveParams } from "../../shared/api/request/save";
import { SearchParams } from "../../shared/api/request/search";
import * as api from "../api/client";
import { cacheActions } from "../reducers/cache";
import { AsyncAction } from "./helpers";

const getEntity = (entityType: EntityType, id: string): AsyncAction => async dispatch => {
  try {
    const result = await api.getEntity(entityType, id);

    dispatch(cacheActions.mergeGetResult(result));
  } catch (e) {
    console.log(e);
  }
};

const createEntity = <E extends EntityObject>(
  entityType: EntityType,
  params: SaveParams<E>
): AsyncAction => async dispatch => {
  try {
    const result = await api.createEntity(entityType, params);

    dispatch(cacheActions.mergeGetResult(result));
  } catch (e) {
    console.log(e);
  }
};

const updateEntity = <E extends EntityObject>(
  entityType: EntityType,
  id: string,
  params: SaveParams<E>
): AsyncAction => async dispatch => {
  try {
    const result = await api.updateEntity(entityType, id, params);

    dispatch(cacheActions.mergeGetResult(result));
  } catch (e) {
    console.log(e);
  }
};

const searchEntity = <E extends EntityObject>(
  entityType: EntityType,
  params: SearchParams<E>
): AsyncAction => async dispatch => {
  try {
    const result = await api.searchEntity(entityType, params);

    dispatch(cacheActions.mergeSearchResult(entityType, params, result));
  } catch (e) {
    console.log(e);
  }
};

export const entityActions = {
  get: getEntity,
  create: createEntity,
  update: updateEntity,
  search: searchEntity
};
