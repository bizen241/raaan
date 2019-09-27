import { BaseEntityObject } from "./BaseEntityObject";

export interface UserConfig extends BaseEntityObject {
  settings: Partial<UserSettings>;
}

export interface UserSettings {
  "ui.lang": Lang;
  "ui.colorScheme": "system" | "dark" | "light";
}

export type Lang = "en" | "ja";
