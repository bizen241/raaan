import { BaseEntityObject } from "./BaseEntityObject";

export interface UserSettings {
  theme?: "dark" | "light";
  lang?: "en" | "ja";
}

export interface UserConfig extends BaseEntityObject {
  userId: string;
  name: string;
  settings: UserSettings;
}
