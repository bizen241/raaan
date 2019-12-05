import { BaseEntityObject, UUID } from "./BaseEntityObject";
import { ReportReason, ReportState } from "./Report";

export interface BaseReportObject extends BaseEntityObject {
  reporterId: UUID;
  targetId: UUID;
  reason: ReportReason;
  description: string;
  state: ReportState;
  comment: string;
}
