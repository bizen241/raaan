import { User, UserSettings } from "../../shared/api/entities";
import { editBuffer } from "../reducers/buffers";

const updateName = (id: string, name: string) =>
  editBuffer<User>("User", id, () => ({
    name
  }));

const updateSettings = <P extends keyof UserSettings>(id: string, key: P, value: UserSettings[P]) =>
  editBuffer<User>("User", id, ({ settings }) => ({
    settings: {
      ...settings,
      [key]: value
    }
  }));

export const userActions = {
  updateName,
  updateSettings
};
