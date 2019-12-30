import { UUID } from "./BaseEntityObject";
import { BaseEntityObject } from "./BaseEntityObject";
import { ReportReason, ReportState } from "./Report";

export interface ReportSummary extends BaseEntityObject {
  parentId: UUID;
  reporterId?: UUID;
  defendantId?: UUID;
  targetType?: UUID;
  targetId?: UUID;
  reason: ReportReason;
  state: ReportState;
  commentCount: number;
}
