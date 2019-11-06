import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ContestEntry extends BaseEntityObject {
  contestId: UUID;
  userSummaryId: UUID;
  typeCount: number;
  time: number;
  accuracy: number;
}
