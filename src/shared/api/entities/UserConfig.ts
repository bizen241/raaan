import { BaseEntityObject } from "./BaseEntityObject";

export interface UserSettings {
  "ui.lang": Lang;
  "ui.colorScheme": "system" | "dark" | "light";
  "ui.avatar": "identicon" | "gravatar" | "hidden";
}

export type Lang = "en" | "ja";

export interface UserConfig extends BaseEntityObject<"UserConfig"> {
  settings: Partial<UserSettings>;
}
