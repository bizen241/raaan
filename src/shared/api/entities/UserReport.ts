import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface UserReport extends BaseEntityObject {
  targetId: UUID;
  reporterId: UUID;
}
