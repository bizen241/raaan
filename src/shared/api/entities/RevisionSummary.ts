import { UUID } from "./BaseEntityObject";
import { BaseEntityObject } from "./BaseEntityObject";

export interface RevisionSummary extends BaseEntityObject {
  revisionId: UUID;
}
