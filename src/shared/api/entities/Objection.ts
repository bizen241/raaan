import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Objection extends BaseEntityObject {
  objectorId: UUID;
  targetType: ObjectionTarget;
  targetId: UUID;
  description: string;
  comment: string;
  state: ObjectionState;
}

export type ObjectionTarget = "Exercise" | "Group" | "Playlist" | "User";

export type ObjectionState = "pending" | "accepted" | "rejected";
