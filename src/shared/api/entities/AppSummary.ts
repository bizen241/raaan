import { BaseEntityObject } from "./BaseEntityObject";

export interface AppSummary extends BaseEntityObject {
  submittedCount: number;
  typedCount: number;
}
