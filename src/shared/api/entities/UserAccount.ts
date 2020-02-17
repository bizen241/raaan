import { EntityId } from ".";
import { AuthProviderName } from "../../auth";
import { BaseEntityObject } from "./BaseEntityObject";

export type AvatarType = "identicon" | "gravatar";

export interface UserAccount extends BaseEntityObject {
  userId?: EntityId<"User">;
  provider: AuthProviderName;
  accountId: string;
  email: string;
  avatar: AvatarType;
}
