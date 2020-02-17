import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";
import { ObjectionState, ObjectionTargetType } from "./Objection";

export interface ObjectionSummary extends BaseEntityObject {
  parentId: EntityId<"Objection">;
  objectorId?: EntityId<"User">;
  targetType?: ObjectionTargetType;
  /**
   * @format uuid
   */
  targetId?: string;
  state: ObjectionState;
  commentCount: number;
}
