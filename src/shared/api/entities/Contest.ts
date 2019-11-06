import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Contest extends BaseEntityObject {
  groupId?: UUID;
  exerciseId: UUID;
  title: string;
  startAt: number;
  finishAt: number;
}
