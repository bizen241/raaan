import { AuthProviderName } from "../../auth";
import { BaseEntityObject } from "./BaseEntityObject";

export interface UserAccount extends BaseEntityObject {
  userId: string;
  provider: AuthProviderName;
  accountId: string;
}
