import { Reducer } from "redux";
import { Actions } from ".";
import { UserConfig, UserSettings } from "../../shared/api/entities";
import { EntityMap } from "../../shared/api/response/entity";
import { ActionUnion, createAction } from "../actions/helpers";

export enum ConfigActionType {
  AddBuffer = "config/add-buffer",
  ResetBuffer = "config/reset-buffer",
  DeleteBuffer = "config/delete-buffer",
  UpdateSettings = "config/update-settings"
}

export interface ConfigBuffer {
  sourceConfig: UserConfig | null;
  editedConfig: UserConfig;
}

const configSyncActions = {
  updateSettings: <P extends keyof UserSettings>(key: P, value: UserSettings[P]) =>
    createAction(ConfigActionType.UpdateSettings, { key, value })
};

export type ConfigActions = ActionUnion<typeof configSyncActions>;

export const configActions = {
  ...configSyncActions
};

export interface ConfigState {
  current: UserConfig;
  buffers: { [id: string]: ConfigBuffer | undefined };
  fetched: EntityMap<UserConfig>;
}

const now = Date.now();
const defaultConfig: UserConfig = {
  id: now.toString(),
  userId: "",
  name: "",
  settings: {
    lang: "ja"
  },
  createdAt: now,
  updatedAt: now,
  fetchedAt: now
};

export const initialConfigState: ConfigState = {
  current: defaultConfig,
  buffers: {
    [defaultConfig.id]: {
      sourceConfig: null,
      editedConfig: defaultConfig
    }
  },
  fetched: {}
};

export const configReducer: Reducer<ConfigState, Actions> = (state = initialConfigState, action) => {
  switch (action.type) {
    case ConfigActionType.UpdateSettings: {
      const { key, value } = action.payload;
      const { id } = state.current;
      const buffer = state.buffers[id];
      if (buffer === undefined) {
        return state;
      }

      const updatedConfig = {
        ...buffer.editedConfig,
        settings: {
          ...buffer.editedConfig.settings,
          [key]: value
        }
      };

      return {
        ...state,
        current: updatedConfig,
        buffers: {
          ...state.buffers,
          [id]: {
            ...buffer,
            editedConfig: updatedConfig
          }
        }
      };
    }
    default:
      return state;
  }
};
