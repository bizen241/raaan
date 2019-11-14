import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Group extends BaseEntityObject {
  secretId: UUID;
  name: string;
  description: string;
}
