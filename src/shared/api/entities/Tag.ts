import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Tag extends BaseEntityObject {
  summaryId: UUID;
  name: string;
  description: string;
}
