import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ContentRevision extends BaseEntityObject {
  contentId: UUID;
  detailId: UUID;
}
