import { UUID } from "./BaseEntityObject";
import { BaseExerciseObject } from "./BaseExerciseObject";

export interface Suggestion extends BaseExerciseObject {
  summaryId: UUID;
  authorId: UUID;
  exerciseId: UUID;
  revisionId: UUID;
  message: string;
  state: SuggestionState;
}

export type SuggestionState = "pending" | "accepted" | "rejected";
