import { AuthProviderName } from "../auth";
import { Base } from "./Base";

export interface Account extends Base<"Account"> {
  userId: string;
  provider: AuthProviderName;
  accountId: string;
}
