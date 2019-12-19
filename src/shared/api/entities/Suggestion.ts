import { UUID } from "./BaseEntityObject";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface Suggestion extends BaseExerciseObject {
  summaryId: UUID;
  authorId: UUID;
  exerciseId: UUID;
  revisionId: UUID;
  state: SuggestionState;
}

export type SuggestionState = "pending" | "accepted" | "rejected";
