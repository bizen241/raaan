import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface BaseObjectionObject extends BaseEntityObject {
  objectorId?: UUID;
  targetId: UUID;
  comment: string;
  state: ObjectionState;
}

export type ObjectionState = "pending" | "accepted" | "rejected";
