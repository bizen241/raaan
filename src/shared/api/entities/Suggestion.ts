import { UUID } from "./BaseEntityObject";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface Suggestion extends BaseExerciseObject {
  summaryId: UUID;
  revisionId: UUID;
  state: SuggestionState;
}

export type SuggestionState = "pending" | "accepted" | "rejected";
