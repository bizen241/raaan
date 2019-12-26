import { UUID } from "./BaseEntityObject";
import { BaseEntityObject } from "./BaseEntityObject";
import { SuggestionState } from "./Suggestion";

export interface SuggestionSummary extends BaseEntityObject {
  exerciseId?: UUID;
  exerciseAuthorId?: UUID;
  revisionId?: UUID;
  suggestionId: UUID;
  authorId?: UUID;
  messageSubject: string;
  state: SuggestionState;
}
