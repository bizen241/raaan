import { BaseEntityObject, UUID } from "./BaseEntityObject";

export type OrderBy =
  | "manual-first"
  | "manual-last"
  | "date-published-asc"
  | "date-published-desc"
  | "date-added-asc"
  | "date-added-desc"
  | "count-submitted-asc"
  | "count-submitted-desc";

export interface Playlist extends BaseEntityObject {
  authorId: UUID;
  summaryId: UUID;
  title: string;
  tags: string[];
  description: string;
  orderBy: OrderBy;
  isPrivate: boolean;
  isLocked: boolean;
  exerciseId?: UUID;
}
