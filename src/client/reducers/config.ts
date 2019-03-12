import { Reducer } from "redux";
import { Actions } from ".";
import { UserConfig, UserSettings } from "../../shared/api/entities";
import { ActionUnion, createAction } from "../actions";
import { editBuffer } from "./buffers";

export enum ConfigActionType {
  Set = "config/set"
}

const configSyncActions = {
  set: (id: string, settings: UserSettings) => createAction(ConfigActionType.Set, { id, settings })
};

export type ConfigActions = ActionUnion<typeof configSyncActions>;

const update = <P extends keyof UserSettings>(id: string, key: P, value: UserSettings[P]) =>
  editBuffer<UserConfig>("UserConfig", id, ({ settings }) => ({
    settings: {
      ...settings,
      [key]: value
    }
  }));

export const configActions = {
  ...configSyncActions,
  update
};

export interface ConfigState {
  id: string;
  settings: UserSettings;
}

const initialConfigState: ConfigState = {
  id: "",
  settings: {}
};

export const configReducer: Reducer<ConfigState, Actions> = (state = initialConfigState, action) => {
  switch (action.type) {
    case ConfigActionType.Set: {
      const { id, settings } = action.payload;

      return {
        id,
        settings
      };
    }
    default:
      return state;
  }
};
