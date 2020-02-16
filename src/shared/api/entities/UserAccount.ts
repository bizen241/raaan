import { AuthProviderName } from "../../auth";
import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export type AvatarType = "identicon" | "gravatar";

export interface UserAccount extends BaseEntityObject<"UserAccount"> {
  userId?: EntityId<"User">;
  provider: AuthProviderName;
  accountId: string;
  email: string;
  avatar: AvatarType;
}
