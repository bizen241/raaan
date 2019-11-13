import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface GroupSecret extends BaseEntityObject {
  groupId: UUID;
  value: string;
  expireAt: number;
}
