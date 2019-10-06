import { BaseEntityObject } from "./BaseEntityObject";

export interface BaseObjectionObject extends BaseEntityObject {
  comment: string;
  state: ObjectionState;
}

export type ObjectionState = "pending" | "accepted" | "rejected";
