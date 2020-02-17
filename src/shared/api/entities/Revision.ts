import { EntityId } from ".";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface Revision extends BaseExerciseObject {
  summaryId: EntityId<"RevisionSummary">;
  exerciseId: EntityId<"Exercise">;
  messageSubject: string;
  messageBody: string;
}
