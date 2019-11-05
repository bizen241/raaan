import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface UserMessage extends BaseEntityObject {
  userId?: UUID;
  body: string;
}
