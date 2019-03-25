import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseRevision extends BaseEntityObject {
  contentId: UUID;
  detailId: UUID;
}
