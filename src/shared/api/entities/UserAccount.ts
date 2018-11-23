import { AuthProviderName } from "../../auth";
import { Base } from "./Base";

export interface UserAccount extends Base<"UserAccount"> {
  userId: string;
  provider: AuthProviderName;
  accountId: string;
}
