import { BaseEntityObject } from "./BaseEntityObject";

export interface AppDiaryEntry extends BaseEntityObject<"AppDiaryEntry"> {
  date: string;
  submittedCount: number;
  typedCount: number;
}
