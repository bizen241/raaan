import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface Contest extends BaseEntityObject<"Contest"> {
  groupId?: EntityId<"Group">;
  exerciseId: EntityId<"Exercise">;
  title: string;
  startAt: number;
  finishAt: number;
}
