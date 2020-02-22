import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export type ReportTargetType = "Exercise" | "Playlist" | "Synonym" | "Tag" | "User";
export type ReportReason = "troll" | "copyright" | "sexual";
export type ReportState = "pending" | "accepted" | "rejected";

export interface Report extends BaseEntityObject<"Report"> {
  summaryId: EntityId<"ReportSummary">;
  reporterId: EntityId<"User">;
  defendantId?: EntityId<"User">;
  targetType: ReportTargetType;
  /**
   * @format uuid
   */
  targetId: string;
  reason: ReportReason;
  description: string;
  state: ReportState;
  comment?: string;
}
