import { BaseEntityObject } from "./BaseEntityObject";

export interface AppDiaryEntry extends BaseEntityObject {
  date: string;
  submittedCount: number;
  typedCount: number;
}
