import { BaseEntityObject } from "./BaseEntityObject";

export interface AppDiaryEntry extends BaseEntityObject {
  date: number;
  submittedCount: number;
  typedCount: number;
}
