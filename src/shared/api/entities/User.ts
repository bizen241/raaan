import { BaseEntityObject } from "./BaseEntityObject";

export type Permission = "Owner" | "Admin" | "Write" | "Guest";

export type ThemeName = "dark" | "light";
export type LangName = "en" | "ja";

export interface UserSettings {
  theme?: ThemeName;
  lang?: LangName;
}

export interface User extends BaseEntityObject {
  name: string;
  permission: Permission;
  settings?: UserSettings;
}
