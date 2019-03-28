import { AuthProviderName } from "../../auth";
import { BaseEntityObject } from "./BaseEntityObject";

export interface UserAccount extends BaseEntityObject {
  provider: AuthProviderName;
  accountId: string;
  email: string;
}
