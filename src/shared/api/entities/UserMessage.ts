import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface UserMessage extends BaseEntityObject<"UserMessage"> {
  userId?: EntityId<"User">;
  body: string;
}
