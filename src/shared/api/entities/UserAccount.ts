import { AuthProviderName } from "../../auth";
import { BaseObject } from "./BaseObject";

export interface UserAccount extends BaseObject {
  userId: string;
  provider: AuthProviderName;
  accountId: string;
}
