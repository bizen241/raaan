import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface RevisionSummary extends BaseEntityObject {
  exerciseId?: EntityId<"Exercise">;
  revisionId: EntityId<"Revision">;
  messageSubject: string;
  searchSort?: "createdAt";
}
