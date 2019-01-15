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
  ToggleContentItemPreviewer = "editor/toggle-content-item-previewer",
  ToggleContentItemMenu = "editor/toggle-content-item-menu"
}

const editorSyncActions = {
  update: (id: string, data: ContentData) => createAction(EditorActionType.Update, { id, data }),
  updateTitle: (value: string) => createAction(EditorActionType.UpdateTitle, { value }),
  addItem: (index: number, type: ContentItem["type"]) => createAction(EditorActionType.AddItem, { index, type }),
  updateItem: (index: number, item: ContentItem) => createAction(EditorActionType.UpdateItem, { index, item }),
  moveItem: (from: number, to: number) => createAction(EditorActionType.MoveItem, { from, to }),
  deleteItem: (id: string) => createAction(EditorActionType.DeleteItem, { id }),
  focusItem: (index: number) => createAction(EditorActionType.FocusItem, { index }),
  focusPreviousItem: () => createAction(EditorActionType.FocusPreviousItem),
  focusNextItem: () => createAction(EditorActionType.FocusNextItem),
  toggleContentPreviewer: () => createAction(EditorActionType.ToggleContentPreviewer),
  toggleContentItemPreviewer: () => createAction(EditorActionType.ToggleContentItemPreviewer),
  toggleContentItemMenu: () => createAction(EditorActionType.ToggleContentItemMenu)
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
  isContentPreviewerOpened: boolean;
  isContentItemPreviewerOpened: boolean;
  isContentItemMenuOpened: boolean;
}

export const initialEditorState: EditorState = {
  id: "",
  data: createContentData(),
  textLang: "ja",
  codeLang: "js",
  focusedItemIndex: 0,
  isFocusedWithHotKey: false,
  isContentPreviewerOpened: false,
  isContentItemPreviewerOpened: false,
  isContentItemMenuOpened: false
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
    case EditorActionType.AddItem: {
      const { index, type } = action.payload;
      const items = [...state.data.items];

      const item = contentItemCreators[type]();

      return {
        ...state,
        data: {
          ...state.data,
          items: [...items.slice(0, index), item, ...items.slice(index)]
        },
        focusedItemIndex: index
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
        isFocusedWithHotKey: true
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
        isContentPreviewerOpened: !state.isContentPreviewerOpened
      };
    }
    case EditorActionType.ToggleContentItemPreviewer: {
      return {
        ...state,
        isContentItemPreviewerOpened: !state.isContentItemPreviewerOpened
      };
    }
    case EditorActionType.ToggleContentItemMenu: {
      return {
        ...state,
        isContentItemMenuOpened: !state.isContentItemMenuOpened
      };
    }
    default:
      return state;
  }
};
