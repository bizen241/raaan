import { push } from "connected-react-router";
import { Reducer } from "redux";
import { ContentRevision } from "../../shared/api/entities";
import { ContentItem } from "../../shared/content";
import { ActionUnion, AsyncAction, createAction } from "../actions";
import { contentItemCreators, createContentRevision } from "../domain/content";
import { apiActions } from "./api";
import { buffersActions, editBuffer } from "./buffers";

export enum ContentActionType {
  FocusItem = "content/focus-item"
}

const contentSyncActions = {
  focusItem: (index: number) => createAction(ContentActionType.FocusItem, { index })
};

export type ContentActions = ActionUnion<typeof contentSyncActions>;

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

const updateTitle = (revisionId: string, title: string) =>
  editBuffer<ContentRevision>("ContentRevision", revisionId, () => ({
    title
  }));

const appendItem = (revisionId: string, itemType: ContentItem["type"]) =>
  editBuffer<ContentRevision>("ContentRevision", revisionId, ({ items = [] }) => ({
    items: [...items, contentItemCreators[itemType]()]
  }));

const updateItem = <P extends keyof ContentItem>(revisionId: string, index: number, key: P, value: ContentItem[P]) =>
  editBuffer<ContentRevision>("ContentRevision", revisionId, ({ items = [] }) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...items[index],
      [key]: value
    };

    return {
      items: updatedItems
    };
  });

const deleteItem = (revisionId: string, index: number) =>
  editBuffer<ContentRevision>("ContentRevision", revisionId, ({ items = [] }) => ({
    items: [...items.slice(0, index), ...items.slice(index + 1)]
  }));

export const contentActions = {
  ...contentSyncActions,
  create,
  updateTitle,
  appendItem,
  updateItem,
  deleteItem
};

export type ContentState = {
  focusedItemIndex: number;
  selectedItemType: ContentItem["type"];
};

export const initialContentState: ContentState = {
  focusedItemIndex: 0,
  selectedItemType: "text"
};

export const contentReducer: Reducer<ContentState, ContentActions> = (state = initialContentState, action) => {
  switch (action.type) {
    case ContentActionType.FocusItem: {
      const { index } = action.payload;

      return {
        ...state,
        focusedItemIndex: index
      };
    }
    default:
      return state;
  }
};
