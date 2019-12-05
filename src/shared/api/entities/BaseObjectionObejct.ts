import { BaseEntityObject, UUID } from "./BaseEntityObject";
import { ObjectionState } from "./Objection";

export interface BaseObjectionObject extends BaseEntityObject {
  objectorId?: UUID;
  targetId: UUID;
  comment: string;
  state: ObjectionState;
}
