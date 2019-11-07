import { UUID } from "./BaseEntityObject";
import { BaseEntityObject } from "./BaseEntityObject";

export interface SuggestionSummary extends BaseEntityObject {
  exerciseId?: UUID;
  suggestionId: UUID;
  authorId: UUID;
  revisionId: UUID;
}
