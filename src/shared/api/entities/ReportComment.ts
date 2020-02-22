import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ReportComment extends BaseEntityObject<"ReportComment"> {
  targetId?: EntityId<"Report">;
  targetSummaryId?: EntityId<"ReportSummary">;
  authorId: EntityId<"User">;
  body: string;
}
