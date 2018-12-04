import { AuthProviderName } from "../../auth";
import { BaseObject } from "./BaseObject";

export interface UserAccount extends BaseObject<"UserAccount"> {
  userId: string;
  provider: AuthProviderName;
  accountId: string;
}
