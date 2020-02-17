import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export type ObjectionTargetType = "Exercise" | "Playlist" | "User";
export type ObjectionState = "pending" | "accepted" | "rejected";

export interface Objection extends BaseEntityObject {
  summaryId: EntityId<"ObjectionSummary">;
  objectorId: EntityId<"User">;
  targetType: ObjectionTargetType;
  /**
   * @format uuid
   */
  targetId: string;
  description: string;
  comment?: string;
  state: ObjectionState;
}
