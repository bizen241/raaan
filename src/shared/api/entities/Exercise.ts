import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Exercise extends BaseEntityObject {
  authorId: UUID;
  detailId: UUID;
  summaryId: UUID;
  tagIds: string[];
  isPrivate: boolean;
  isLocked: boolean;
}
