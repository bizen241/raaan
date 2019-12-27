import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Objection extends BaseEntityObject {
  objectorId: UUID;
  targetType: ObjectionTargetType;
  targetId: UUID;
  description: string;
  comment?: string;
  state: ObjectionState;
}

export type ObjectionTargetType = "Exercise" | "Playlist" | "User";

export type ObjectionState = "pending" | "accepted" | "rejected";
