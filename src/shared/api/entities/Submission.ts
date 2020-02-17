import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface Submission extends BaseEntityObject {
  submitterId: EntityId<"User">;
  exerciseId: EntityId<"Exercise">;
  playlistId?: EntityId<"Playlist">;
  contestId?: EntityId<"Contest">;
  /**
   * @minimum 1
   */
  typeCount: number;
  /**
   * @minimum 1
   */
  time: number;
  /**
   * @minimum 0
   * @maximum 100
   */
  accuracy: number;
}
