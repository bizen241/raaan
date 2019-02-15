import { Reducer } from "redux";
import { Actions } from ".";
import { ContentRevision } from "../../shared/api/entities";
import { ContentItem } from "../../shared/content";
import { ActionUnion, AsyncAction, createAction } from "../actions/helpers";
import { contentItemCreators, ContentRevisionParams, createContentRevision } from "../domain/content";

export enum EditorActionType {
  AddBuffer = "editor/add-buffer",
  ResetBuffer = "editor/reset-buffer",
  DeleteBuffer = "editor/delete-buffer",
  SelectItemType = "editor/select-item-type",
  SelectItemLang = "editor/select-item-lang",
  SelectTextLang = "editor/select-text-lang",
  SelectCodeLang = "editor/select-code-lang",
  UpdateTitle = "editor/update-title",
  UpdateItem = "editor/update-item",
  DeleteItem = "editor/delete-item",
  AppendItem = "editor/append-item"
}

export interface EditorBuffer {
  sourceRevision: ContentRevision | null;
  editedRevision: ContentRevisionParams;
}

const editorSyncActions = {
  addBuffer: (id: string, buffer: EditorBuffer) => createAction(EditorActionType.AddBuffer, { id, buffer }),
  resetBuffer: (id: string) => createAction(EditorActionType.ResetBuffer, { id }),
  deleteBuffer: (id: string) => createAction(EditorActionType.DeleteBuffer, { id }),
  selectItemType: (type: ContentItem["type"]) => createAction(EditorActionType.SelectItemType, { type }),
  selectItemLang: (lang: string) => createAction(EditorActionType.SelectItemLang, { lang }),
  selectTextLang: (lang: string) => createAction(EditorActionType.SelectTextLang, { lang }),
  selectCodeLang: (lang: string) => createAction(EditorActionType.SelectCodeLang, { lang }),
  updateTitle: (id: string, title: string) => createAction(EditorActionType.UpdateTitle, { id, title }),
  updateItem: <P extends keyof ContentItem>(id: string, index: number, key: P, value: ContentItem[P]) =>
    createAction(EditorActionType.UpdateItem, { id, index, key, value }),
  deleteItem: (id: string, index: number) => createAction(EditorActionType.DeleteItem, { id, index }),
  appendItem: (id: string) => createAction(EditorActionType.AppendItem, { id })
};

export type EditorActions = ActionUnion<typeof editorSyncActions>;

const load = (id: string): AsyncAction => async (dispatch, getState) => {
  const buffer = getState().editor.buffers[id];

  if (buffer === undefined) {
    dispatch(
      editorSyncActions.addBuffer(id, {
        sourceRevision: null,
        editedRevision: createContentRevision(id)
      })
    );
  }
};

const save = (_: string): AsyncAction => async __ => {
  /*
  dispatch(editorSyncActions.startSave());

  const newId = await createEntity(revision)

  openBuffer(newId, buffer);
  replaceState(newId);
  deleteBuffer(id);

  disdpatch(editorSyncActions.finishSave());
  */
};

export const editorActions = {
  ...editorSyncActions,
  load,
  save
};

export interface EditorState {
  buffers: { [id: string]: EditorBuffer | undefined };
  trash: { [id: string]: EditorBuffer | undefined };
  itemType: ContentItem["type"];
  itemLang: string;
  textLang: string;
  codeLang: string;
}

export const initialEditorState: EditorState = {
  buffers: {},
  trash: {},
  itemType: "kanji",
  itemLang: "ja",
  textLang: "ja",
  codeLang: "js"
};

const editContent = (
  state: EditorState,
  id: string,
  callback: (revision: ContentRevisionParams) => ContentRevisionParams
): EditorState => {
  const buffer = state.buffers[id];
  if (buffer === undefined) {
    return state;
  }

  return {
    ...state,
    buffers: {
      ...state.buffers,
      [id]: {
        ...buffer,
        editedRevision: callback(buffer.editedRevision)
      }
    }
  };
};

export const editorReducer: Reducer<EditorState, Actions> = (state = initialEditorState, action) => {
  switch (action.type) {
    case EditorActionType.AddBuffer: {
      const { id, buffer } = action.payload;

      return {
        ...state,
        buffers: {
          ...state.buffers,
          [id]: buffer
        }
      };
    }
    case EditorActionType.ResetBuffer: {
      const { id } = action.payload;
      const buffer = state.buffers[id];
      if (buffer === undefined) {
        return state;
      }

      return {
        ...state,
        buffers: {
          ...state.buffers,
          [id]: {
            ...buffer,
            editedRevision: buffer.sourceRevision || createContentRevision(id)
          }
        }
      };
    }
    case EditorActionType.DeleteBuffer: {
      const { id } = action.payload;
      const { [id]: deleted, ...buffers } = state.buffers;

      return {
        ...state,
        buffers,
        trash: {
          [id]: deleted
        }
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
      const { id, title } = action.payload;

      return editContent(state, id, revision => ({
        ...revision,
        title
      }));
    }
    case EditorActionType.UpdateItem: {
      const { id, index, key, value } = action.payload;

      return editContent(state, id, revision => {
        const items = [...revision.items];
        items[index] = {
          ...items[index],
          [key]: value
        };

        return {
          ...revision,
          items
        };
      });
    }
    case EditorActionType.DeleteItem: {
      const { id, index } = action.payload;

      return editContent(state, id, revision => ({
        ...revision,
        items: [...revision.items.slice(0, index), ...revision.items.slice(index + 1)]
      }));
    }
    case EditorActionType.AppendItem: {
      const { id } = action.payload;

      return editContent(state, id, revision => ({
        ...revision,
        items: [...revision.items, contentItemCreators[state.itemType]()]
      }));
    }
    default:
      return state;
  }
};
