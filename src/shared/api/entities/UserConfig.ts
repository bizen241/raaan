import { BaseEntityObject, UUID } from "./BaseEntityObject";

export type ThemeName = "dark" | "light";
export type LangName = "en" | "ja";

export interface UserSettings {
  theme?: ThemeName;
  lang?: LangName;
}

export interface UserConfig extends BaseEntityObject {
  userId: UUID;
  name: string;
  settings: UserSettings;
}
