import { EntityId } from ".";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface Revision extends BaseExerciseObject<"Revision"> {
  summaryId: EntityId<"RevisionSummary">;
  exerciseId: EntityId<"Exercise">;
  messageSubject: string;
  messageBody: string;
}
