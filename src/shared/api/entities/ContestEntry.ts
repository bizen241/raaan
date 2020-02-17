import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ContestEntry extends BaseEntityObject {
  contestId: EntityId<"Contest">;
  userSummaryId: EntityId<"UserSummary">;
  typeCount: number;
  time: number;
  accuracy: number;
}
