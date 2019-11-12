import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface GroupSummary extends BaseEntityObject {
  groupId: UUID;
  name: string;
  description: string;
  ownerId?: UUID;
}
