import { Reducer } from "redux";
import { ContentData, ContentItem } from "../../shared/content";
import { ActionUnion, AsyncAction, createAction } from "../actions/helpers";
import { contentItemCreators, createContentData } from "../domain/content";

export enum EditorActionType {
  Update = "editor/update",
  UpdateTitle = "editor/update-title",
  AddItem = "editor/add-item",
  UpdateItem = "editor/update-item",
  MoveItem = "editor/move-item",
  DeleteItem = "editor/delete-item",
  FocusItem = "editor/focus-item",
  FocusPreviousItem = "editor/focus-previous-item",
  FocusNextItem = "editor/focus-next-item",
  ToggleContentPreviewer = "editor/toggle-content-previewer",
  ToggleContentItemPreviewer = "editor/toggle-content-item-previewer"
}

const editorSyncActions = {
  update: (id: string, data: ContentData) => createAction(EditorActionType.Update, { id, data }),
  updateTitle: (value: string) => createAction(EditorActionType.UpdateTitle, { value }),
  addItem: (index: number, type: ContentItem["type"]) => createAction(EditorActionType.AddItem, { index, type }),
  updateItem: (index: number, item: ContentItem) => createAction(EditorActionType.UpdateItem, { index, item }),
  moveItem: (from: number, to: number) => createAction(EditorActionType.MoveItem, { from, to }),
  deleteItem: (index: number) => createAction(EditorActionType.DeleteItem, { index }),
  focusItem: (index: number) => createAction(EditorActionType.FocusItem, { index }),
  focusPreviousItem: () => createAction(EditorActionType.FocusPreviousItem),
  focusNextItem: () => createAction(EditorActionType.FocusNextItem),
  toggleContentPreviewer: () => createAction(EditorActionType.ToggleContentPreviewer),
  toggleContentItemPreviewer: () => createAction(EditorActionType.ToggleContentItemPreviewer)
};

export type EditorActions = ActionUnion<typeof editorSyncActions>;

const load = (id: string): AsyncAction => async (dispatch, getState) => {
  const currentId = getState().editor.id;

  if (currentId !== id) {
    dispatch(editorSyncActions.update(id, createContentData()));
  }
};

export const editorActions = {
  ...editorSyncActions,
  load
};

export interface EditorState {
  id: string;
  data: ContentData;
  textLang: string;
  codeLang: string;
  focusedItemIndex: number;
  isFocusedWithHotKey: boolean;
  isOpenedContentPreviewer: boolean;
  isOpenedContentItemPreviewer: boolean;
}

export const initialEditorState: EditorState = {
  id: "",
  data: createContentData(),
  textLang: "ja",
  codeLang: "js",
  focusedItemIndex: 0,
  isFocusedWithHotKey: false,
  isOpenedContentPreviewer: false,
  isOpenedContentItemPreviewer: false
};

export const editorReducer: Reducer<EditorState, EditorActions> = (state = initialEditorState, action) => {
  switch (action.type) {
    case EditorActionType.Update: {
      return {
        ...state,
        ...action.payload,
        isOpenedContentPreviewer: false,
        isOpenedContentItemPreviewer: false
      };
    }
    case EditorActionType.UpdateTitle: {
      return {
        ...state,
        data: {
          ...state.data,
          title: action.payload.value
        }
      };
    }
    case EditorActionType.AddItem: {
      const { index, type } = action.payload;
      const parts = state.data.items;

      const item = contentItemCreators[type]();

      return {
        ...state,
        data: {
          ...state.data,
          items: [...parts.slice(0, index), item, ...parts.slice(index)]
        },
        focusedItemIndex: index
      };
    }
    case EditorActionType.UpdateItem: {
      const { index, item } = action.payload;
      const parts = [...state.data.items];
      parts[index] = item;

      return {
        ...state,
        data: {
          ...state.data,
          items: parts
        },
        textLang: item.type === "text" ? item.lang : state.textLang,
        codeLang: item.type === "code" ? item.lang : state.codeLang
      };
    }
    case EditorActionType.DeleteItem: {
      const index = action.payload.index;
      const parts = state.data.items;

      return {
        ...state,
        data: {
          ...state.data,
          items: [...parts.slice(0, index), ...parts.slice(index + 1)]
        },
        focusedItemIndex: index === 0 ? 0 : index - 1,
        isFocusedWithHotKey: true
      };
    }
    case EditorActionType.FocusItem: {
      return {
        ...state,
        focusedItemIndex: action.payload.index,
        isFocusedWithHotKey: false
      };
    }
    case EditorActionType.FocusPreviousItem: {
      const { focusedItemIndex } = state;

      return {
        ...state,
        focusedItemIndex: focusedItemIndex === 0 ? 0 : focusedItemIndex - 1,
        isFocusedWithHotKey: true
      };
    }
    case EditorActionType.FocusNextItem: {
      const { focusedItemIndex } = state;
      const lastItemIndex = state.data.items.length - 1;

      return {
        ...state,
        focusedItemIndex: lastItemIndex === focusedItemIndex ? focusedItemIndex : focusedItemIndex + 1,
        isFocusedWithHotKey: true
      };
    }
    case EditorActionType.ToggleContentPreviewer: {
      return {
        ...state,
        isOpenedContentPreviewer: !state.isOpenedContentPreviewer
      };
    }
    case EditorActionType.ToggleContentItemPreviewer: {
      return {
        ...state,
        isOpenedContentItemPreviewer: !state.isOpenedContentItemPreviewer
      };
    }
    default:
      return state;
  }
};
