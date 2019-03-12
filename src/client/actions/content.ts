import { push } from "connected-react-router";
import { AsyncAction } from ".";
import { ContentRevision } from "../../shared/api/entities";
import { ContentItem } from "../../shared/content";
import { contentItemCreators, createContentRevision } from "../domain/content";
import { apiActions } from "../reducers/api";
import { buffersActions, editBuffer } from "../reducers/buffers";

const create = (sourceId?: string): AsyncAction => async (dispatch, getState) => {
  const bufferId = Date.now().toString();

  if (sourceId === undefined) {
    const params = createContentRevision();

    dispatch(buffersActions.add("ContentRevision", bufferId, params));
  } else {
    const isCached = getState().cache.get.ContentRevision[sourceId] !== undefined;

    if (!isCached) {
      await apiActions.get("ContentRevision", sourceId)(dispatch, getState, undefined);
    }

    const revision = getState().cache.get.ContentRevision[sourceId];
    if (revision === undefined) {
      apiActions.clear("get", "ContentRevision", sourceId);

      return;
    }

    const { id, createdAt, updatedAt, fetchedAt, ...params } = revision;

    dispatch(buffersActions.add("ContentRevision", bufferId, params));
  }

  dispatch(push(`/contents/${bufferId}/edit`));
};

const updateTitle = (bufferId: string, title: string) =>
  editBuffer<ContentRevision>("ContentRevision", bufferId, () => ({
    title
  }));

const appendItem = (bufferId: string, itemType: ContentItem["type"]) =>
  editBuffer<ContentRevision>("ContentRevision", bufferId, ({ items = [] }) => ({
    items: [...items, contentItemCreators[itemType]()]
  }));

const updateItem = <P extends keyof ContentItem>(bufferId: string, index: number, key: P, value: ContentItem[P]) =>
  editBuffer<ContentRevision>("ContentRevision", bufferId, ({ items = [] }) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...items[index],
      [key]: value
    };

    return {
      items: updatedItems
    };
  });

const deleteItem = (bufferId: string, index: number) =>
  editBuffer<ContentRevision>("ContentRevision", bufferId, ({ items = [] }) => ({
    items: [...items.slice(0, index), ...items.slice(index + 1)]
  }));

export const contentActions = {
  create,
  updateTitle,
  appendItem,
  updateItem,
  deleteItem
};
