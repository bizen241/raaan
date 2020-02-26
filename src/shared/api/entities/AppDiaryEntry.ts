import { BaseDiaryEntryObject } from "./BaseDiaryEntryObject";

export interface AppDiaryEntry extends BaseDiaryEntryObject<"AppDiaryEntry"> {
  submittedCount: number;
  typedCount: number;
}
