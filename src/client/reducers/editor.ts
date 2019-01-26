import { Reducer } from "redux";
import { Actions } from ".";
import { ContentItem } from "../../shared/content";
import { ActionUnion, AsyncAction, createAction } from "../actions/helpers";
import { contentItemCreators, createContentData } from "../domain/content";
import { bufferActions, EditorBuffer } from "./buffer";

export enum EditorActionType {
  SetBuffer = "editor/set-buffer",
  ResetBuffer = "editor/reset-buffer",
  SelectItemType = "editor/select-item-type",
  SelectItemLang = "editor/select-item-lang",
  SelectTextLang = "editor/select-text-lang",
  SelectCodeLang = "editor/select-code-lang",
  UpdateTitle = "editor/update-title",
  UpdateItem = "editor/update-item",
  DeleteItem = "editor/delete-item",
  AppendItem = "editor/append-item"
}

const editorSyncActions = {
  setBuffer: (id: string, buffer: EditorBuffer) => createAction(EditorActionType.SetBuffer, { id, buffer }),
  resetBuffer: () => createAction(EditorActionType.ResetBuffer),
  selectItemType: (type: ContentItem["type"]) => createAction(EditorActionType.SelectItemType, { type }),
  selectItemLang: (lang: string) => createAction(EditorActionType.SelectItemLang, { lang }),
  selectTextLang: (lang: string) => createAction(EditorActionType.SelectTextLang, { lang }),
  selectCodeLang: (lang: string) => createAction(EditorActionType.SelectCodeLang, { lang }),
  updateTitle: (title: string) => createAction(EditorActionType.UpdateTitle, { title }),
  updateItem: <P extends keyof ContentItem>(index: number, key: P, value: ContentItem[P]) =>
    createAction(EditorActionType.UpdateItem, { index, key, value }),
  deleteItem: (index: number) => createAction(EditorActionType.DeleteItem, { index }),
  appendItem: () => createAction(EditorActionType.AppendItem)
};

export type EditorActions = ActionUnion<typeof editorSyncActions>;

const load = (id: string): AsyncAction => async (dispatch, getState) => {
  const { buffer: buffers } = getState();
  const buffer = buffers[id];

  if (buffer === undefined) {
    const data = createContentData();

    dispatch(
      editorSyncActions.setBuffer(id, {
        parentId: null,
        sourceComment: "",
        editedComment: "",
        sourceData: data,
        editedData: data
      })
    );
  }
};

const save = (id: string): AsyncAction => async (dispatch, getState) => {
  const { parentId, sourceComment, editedComment, sourceData, editedData } = getState().editor;

  dispatch(
    bufferActions.update(id, {
      parentId,
      sourceComment,
      editedComment,
      sourceData,
      editedData
    })
  );

  console.log(id, "saved!");
};

export const editorActions = {
  ...editorSyncActions,
  load,
  save
};

export interface EditorState extends EditorBuffer {
  revisionId: string | null;
  itemType: ContentItem["type"];
  itemLang: string;
  textLang: string;
  codeLang: string;
}

export const initialEditorState: EditorState = {
  revisionId: null,
  parentId: null,
  sourceComment: "",
  editedComment: "",
  sourceData: createContentData(),
  editedData: createContentData(),
  itemType: "kanji",
  itemLang: "ja",
  textLang: "ja",
  codeLang: "js"
};

export const editorReducer: Reducer<EditorState, Actions> = (state = initialEditorState, action) => {
  switch (action.type) {
    case EditorActionType.SetBuffer: {
      const { id, buffer } = action.payload;

      return {
        ...state,
        ...buffer,
        revisionId: id
      };
    }
    case EditorActionType.ResetBuffer: {
      return {
        ...state,
        editedComment: state.sourceComment,
        editedData: state.sourceData
      };
    }
    case EditorActionType.SelectItemType: {
      return {
        ...state,
        itemType: action.payload.type
      };
    }
    case EditorActionType.SelectItemLang: {
      return {
        ...state,
        itemLang: action.payload.lang
      };
    }
    case EditorActionType.SelectTextLang: {
      return {
        ...state,
        textLang: action.payload.lang
      };
    }
    case EditorActionType.SelectCodeLang: {
      return {
        ...state,
        codeLang: action.payload.lang
      };
    }
    case EditorActionType.UpdateTitle: {
      const { title } = action.payload;

      return {
        ...state,
        editedData: {
          ...state.editedData,
          title
        }
      };
    }
    case EditorActionType.UpdateItem: {
      const { index, key, value } = action.payload;

      const items = [...state.editedData.items];
      items[index] = {
        ...items[index],
        [key]: value
      };

      return {
        ...state,
        editedData: {
          ...state.editedData,
          items
        }
      };
    }
    case EditorActionType.AppendItem: {
      return {
        ...state,
        editedData: {
          ...state.editedData,
          items: [...state.editedData.items, contentItemCreators[state.itemType]()]
        }
      };
    }
    default:
      return state;
  }
};
