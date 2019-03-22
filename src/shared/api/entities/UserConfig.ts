import { BaseEntityObject } from "./BaseEntityObject";

export type Lang = "default" | "system" | "en" | "ja";
export type Theme = "default" | "system" | "dark" | "light";

export interface UserConfig extends BaseEntityObject {
  lang: Lang;
  theme: Theme;
}
