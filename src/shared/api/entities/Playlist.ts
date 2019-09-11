import { BaseEntityObject, UUID } from "./BaseEntityObject";

export type OrderBy =
  | "manual_top"
  | "manual_bottom"
  | "date_published_desc"
  | "date_published_asc"
  | "date_added_desc"
  | "date_added_asc"
  | "submit_count_desc";

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
