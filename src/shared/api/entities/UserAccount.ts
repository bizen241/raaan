import { AuthProviderName } from "../../auth";
import { BaseEntityObject, UUID } from "./BaseEntityObject";

export type AvatarType = "identicon" | "gravatar";

export interface UserAccount extends BaseEntityObject {
  userId?: UUID;
  provider: AuthProviderName;
  accountId: string;
  email: string;
  avatar: AvatarType;
}
