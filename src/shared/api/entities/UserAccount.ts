import { AuthProviderName } from "../../auth";
import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface UserAccount extends BaseEntityObject {
  userId?: UUID;
  provider: AuthProviderName;
  accountId: string;
  email: string;
}
