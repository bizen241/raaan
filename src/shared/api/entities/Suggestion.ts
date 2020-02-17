import { EntityId } from ".";
import { BaseExerciseObject } from "./BaseExerciseObject";

export type SuggestionState = "pending" | "accepted" | "rejected";

export interface Suggestion extends BaseExerciseObject {
  summaryId: EntityId<"SuggestionSummary">;
  authorId: EntityId<"User">;
  exerciseId: EntityId<"Exercise">;
  revisionId: EntityId<"Revision">;
  messageSubject: string;
  messageBody: string;
  state: SuggestionState;
}
