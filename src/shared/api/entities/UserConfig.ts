import { BaseEntityObject } from "./BaseEntityObject";

export type LangName = "en" | "ja";
export type Lang = "default" | "system" | LangName;

export type ThemeName = "dark" | "light";
export type Theme = "default" | "system" | ThemeName;

export interface UserConfig extends BaseEntityObject {
  lang: Lang;
  theme: Theme;
}
