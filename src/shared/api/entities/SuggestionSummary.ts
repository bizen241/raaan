import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";
import { SuggestionState } from "./Suggestion";

export interface SuggestionSummary extends BaseEntityObject<"SuggestionSummary"> {
  exerciseId?: EntityId<"Exercise">;
  exerciseAuthorId?: EntityId<"User">;
  revisionId?: EntityId<"Revision">;
  suggestionId: EntityId<"Suggestion">;
  authorId?: EntityId<"User">;
  messageSubject: string;
  state: SuggestionState;
  commentCount: number;
}
