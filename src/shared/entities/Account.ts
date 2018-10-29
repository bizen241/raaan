import { AuthProviderName } from "../auth";
import { BaseEntity } from "./Base";

export interface AccountEntity extends BaseEntity<"Account"> {
  userId: string;
  provider: AuthProviderName;
  accountId: string;
}
