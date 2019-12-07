import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Group extends BaseEntityObject {
  summaryId: UUID;
  secretId: UUID;
  name: string;
  description: string;
}
