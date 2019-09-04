import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Submission extends BaseEntityObject {
  submitterId: UUID;
  exerciseId: UUID;
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
  finishedAt: number;
}
