import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Report extends BaseEntityObject {
  reporterId: UUID;
  defendantId?: UUID;
  targetType: ReportTargetType;
  targetId: UUID;
  reason: ReportReason;
  description: string;
  state: ReportState;
  comment?: string;
}

export type ReportTargetType = "Exercise" | "Playlist" | "Synonym" | "Tag" | "User";

export type ReportReason = "troll" | "copyright" | "sexual";

export type ReportState = "pending" | "accepted" | "rejected";
