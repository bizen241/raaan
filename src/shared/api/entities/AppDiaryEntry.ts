import { BaseEntityObject } from "./BaseEntityObject";

export interface AppDiaryEntry extends BaseEntityObject<"AppDiaryEntry"> {
  date: number;
  submittedCount: number;
  typedCount: number;
}
