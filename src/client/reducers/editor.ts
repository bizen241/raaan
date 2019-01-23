import { Reducer } from "redux";
import { ContentData, ContentItem } from "../../shared/content";
import { ActionUnion, AsyncAction, createAction } from "../actions/helpers";
import { createContentData } from "../domain/content";

export enum EditorActionType {
  Update = "editor/update",
  SelectItemType = "editor/select-item-type",
  SelectItemLang = "editor/select-item-lang",
  SelectTextLang = "editor/select-text-lang",
  SelectCodeLang = "editor/select-code-lang"
}

const editorSyncActions = {
  update: (id: string, data: ContentData) => createAction(EditorActionType.Update, { id, data }),
  selectItemType: (type: ContentItem["type"]) => createAction(EditorActionType.SelectItemType, { type }),
  selectItemLang: (lang: string) => createAction(EditorActionType.SelectItemLang, { lang }),
  selectTextLang: (lang: string) => createAction(EditorActionType.SelectTextLang, { lang }),
  selectCodeLang: (lang: string) => createAction(EditorActionType.SelectCodeLang, { lang })
};

export type EditorActions = ActionUnion<typeof editorSyncActions>;

const load = (id: string): AsyncAction => async (dispatch, getState) => {
  const data = getState().editor.buffer[id];

  if (data === undefined) {
    dispatch(editorSyncActions.update(id, createContentData()));
  }
};

const save = (id: string): AsyncAction => async () => {
  console.log(id, "saved!");
};

export const editorActions = {
  ...editorSyncActions,
  load,
  save
};

export interface EditorState {
  buffer: { [id: string]: ContentData | undefined };
  itemType: ContentItem["type"];
  itemLang: string;
  textLang: string;
  codeLang: string;
}

export const initialEditorState: EditorState = {
  buffer: {},
  itemLang: "ja",
  textLang: "ja",
  codeLang: "js",
  itemType: "kanji"
};

export const editorReducer: Reducer<EditorState, EditorActions> = (state = initialEditorState, action) => {
  switch (action.type) {
    case EditorActionType.Update: {
      return {
        ...state,
        buffer: {
          ...state.buffer,
          [action.payload.id]: action.payload.data
        }
      };
    }
    case EditorActionType.SelectItemType: {
      return {
        ...state,
        itemType: action.payload.type
      };
    }
    default:
      return state;
  }
};
