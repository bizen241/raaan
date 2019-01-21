import { Reducer } from "redux";
import { ContentData, ContentItem } from "../../shared/content";
import { ActionUnion, AsyncAction, createAction } from "../actions/helpers";
import { contentItemCreators, createContentData } from "../domain/content";

export enum EditorActionType {
  Update = "editor/update",
  UpdateTitle = "editor/update-title",
  PushItem = "editor/push-item",
  UpdateItem = "editor/update-item",
  MoveItem = "editor/move-item",
  DeleteItem = "editor/delete-item",
  SelectItemType = "editor/select-item-type",
  FocusItem = "editor/focus-item",
  FocusPreviousItem = "editor/focus-previous-item",
  FocusNextItem = "editor/focus-next-item",
  ToggleContentPreviewer = "editor/toggle-content-previewer",
  ToggleContentItemPreviewer = "editor/toggle-content-item-previewer"
}

const editorSyncActions = {
  update: (id: string, data: ContentData) => createAction(EditorActionType.Update, { id, data }),
  updateTitle: (value: string) => createAction(EditorActionType.UpdateTitle, { value }),
  pushItem: () => createAction(EditorActionType.PushItem),
  updateItem: (index: number, item: ContentItem) => createAction(EditorActionType.UpdateItem, { index, item }),
  moveItem: (from: number, to: number) => createAction(EditorActionType.MoveItem, { from, to }),
  deleteItem: (id: string) => createAction(EditorActionType.DeleteItem, { id }),
  selectItemType: (type: ContentItem["type"]) => createAction(EditorActionType.SelectItemType, { type }),
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
  selectedItemType: ContentItem["type"];
  isFocusedWithHotKey: boolean;
  isContentPreviewerOpened: boolean;
  isContentItemPreviewerOpened: boolean;
}

export const initialEditorState: EditorState = {
  id: "",
  data: createContentData(),
  textLang: "ja",
  codeLang: "js",
  focusedItemIndex: 0,
  selectedItemType: "kanji",
  isFocusedWithHotKey: false,
  isContentPreviewerOpened: false,
  isContentItemPreviewerOpened: false
};

export const editorReducer: Reducer<EditorState, EditorActions> = (state = initialEditorState, action) => {
  switch (action.type) {
    case EditorActionType.Update: {
      return {
        ...state,
        ...action.payload,
        isContentPreviewerOpened: false,
        isContentItemPreviewerOpened: false
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
    case EditorActionType.PushItem: {
      const items = [...state.data.items];
      const item = contentItemCreators[state.selectedItemType]();

      return {
        ...state,
        data: {
          ...state.data,
          items: [...items, item]
        },
        focusedItemIndex: items.length
      };
    }
    case EditorActionType.UpdateItem: {
      const { index, item } = action.payload;
      const items = [...state.data.items];
      items[index] = item;

      return {
        ...state,
        data: {
          ...state.data,
          items
        },
        textLang: item.type === "text" ? item.lang : state.textLang,
        codeLang: item.type === "code" ? item.lang : state.codeLang
      };
    }
    case EditorActionType.DeleteItem: {
      const id = action.payload.id;
      const items = [...state.data.items];
      const index = items.findIndex(item => item.id === id);

      return {
        ...state,
        data: {
          ...state.data,
          items: [...items.slice(0, index), ...items.slice(index + 1)]
        },
        focusedItemIndex: index === items.length - 1 ? index - 1 : index,
        isFocusedWithHotKey: true,
        isContentItemMenuOpened: false
      };
    }
    case EditorActionType.SelectItemType: {
      return {
        ...state,
        selectedItemType: action.payload.type
      };
    }
    case EditorActionType.FocusItem: {
      return {
        ...state,
        focusedItemIndex: action.payload.index,
        isFocusedWithHotKey: false,
        isContentItemMenuOpened: false
      };
    }
    case EditorActionType.FocusPreviousItem: {
      const { focusedItemIndex } = state;

      return {
        ...state,
        focusedItemIndex: focusedItemIndex === 0 ? 0 : focusedItemIndex - 1,
        isFocusedWithHotKey: true,
        isContentItemMenuOpened: false
      };
    }
    case EditorActionType.FocusNextItem: {
      const { focusedItemIndex } = state;
      const lastItemIndex = state.data.items.length - 1;

      return {
        ...state,
        focusedItemIndex: lastItemIndex === focusedItemIndex ? focusedItemIndex : focusedItemIndex + 1,
        isFocusedWithHotKey: true,
        isContentItemMenuOpened: false
      };
    }
    case EditorActionType.ToggleContentPreviewer: {
      return {
        ...state,
        isContentPreviewerOpened: !state.isContentPreviewerOpened,
        isContentItemPreviewerOpened: false,
        isContentItemMenuOpened: false
      };
    }
    case EditorActionType.ToggleContentItemPreviewer: {
      return {
        ...state,
        isContentPreviewerOpened: false,
        isContentItemPreviewerOpened: !state.isContentItemPreviewerOpened,
        isContentItemMenuOpened: false
      };
    }
    default:
      return state;
  }
};
