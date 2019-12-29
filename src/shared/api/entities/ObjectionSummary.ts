import { UUID } from "./BaseEntityObject";
import { BaseEntityObject } from "./BaseEntityObject";
import { ObjectionState } from "./Objection";

export interface ObjectionSummary extends BaseEntityObject {
  parentId: UUID;
  state: ObjectionState;
  commentCount: number;
}
