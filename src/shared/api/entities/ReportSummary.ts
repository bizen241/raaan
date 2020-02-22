import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";
import { ReportReason, ReportState, ReportTargetType } from "./Report";

export interface ReportSummary extends BaseEntityObject<"ReportSummary"> {
  parentId: EntityId<"Report">;
  reporterId?: EntityId<"User">;
  defendantId?: EntityId<"User">;
  targetType?: ReportTargetType;
  /**
   * @format uuid
   */
  targetId?: string;
  reason: ReportReason;
  state: ReportState;
  commentCount: number;
}
