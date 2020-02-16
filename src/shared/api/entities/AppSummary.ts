import { BaseEntityObject } from "./BaseEntityObject";

export interface AppSummary extends BaseEntityObject<"AppSummary"> {
  submittedCount: number;
  typedCount: number;
}
