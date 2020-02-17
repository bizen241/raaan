import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface UserMessage extends BaseEntityObject {
  userId?: EntityId<"User">;
  body: string;
}
