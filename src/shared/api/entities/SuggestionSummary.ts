import { UUID } from "./BaseEntityObject";
import { BaseEntityObject } from "./BaseEntityObject";

export interface SuggestionSummary extends BaseEntityObject {
  suggestionId: UUID;
  authorId: UUID;
  exerciseId: UUID;
}
