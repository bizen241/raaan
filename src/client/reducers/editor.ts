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
  isOpenedContentPreviewer: boolean;
  isOpenedContentItemPreviewer: boolean;
}

export const initialEditorState: EditorState = {
  id: "",
  data: createContentData(),
  textLang: "ja",
  codeLang: "js",
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
        }
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
        }
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
