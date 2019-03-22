import { Lang, Theme, UserConfig } from "../../shared/api/entities";
import { editBuffer } from "../reducers/buffers";

const updateLang = (id: string, lang: Lang) =>
  editBuffer<UserConfig>("UserConfig", id, () => ({
    lang
  }));

const updateTheme = (id: string, theme: Theme) =>
  editBuffer<UserConfig>("UserConfig", id, () => ({
    theme
  }));

export const userConfigActions = {
  updateLang,
  updateTheme
};
