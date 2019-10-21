import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface BaseReportObject extends BaseEntityObject {
  reporterId: UUID;
  targetId?: UUID;
  reason: ReportReason;
  comment: string;
  state: ReportState;
}

export type ReportReason = "troll" | "copyright" | "sexual";

export type ReportState = "pending" | "accepted" | "rejected";
