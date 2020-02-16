import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export type OrderBy =
  | "manual-first"
  | "manual-last"
  | "date-published-asc"
  | "date-published-desc"
  | "date-added-asc"
  | "date-added-desc"
  | "count-submitted-asc"
  | "count-submitted-desc";

export interface Playlist extends BaseEntityObject<"Playlist"> {
  summaryId: EntityId<"PlaylistSummary">;
  authorId: EntityId<"User">;
  title: string;
  tags: string[];
  description: string;
  orderBy: OrderBy;
  isPrivate: boolean;
  isLocked: boolean;
  exerciseId?: EntityId<"Exercise">;
}
