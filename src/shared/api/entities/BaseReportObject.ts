import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface BaseReportObject extends BaseEntityObject {
  reporterId: UUID;
  reason: ReportReason;
  comment: string;
  state: ReportState;
}

export type ReportReason = "spam" | "copyright" | "sexual";

export type ReportState = "pending" | "accepted" | "rejected";
