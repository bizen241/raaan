import { AuthProviderName } from "../auth";
import { BaseEntity } from "./BaseEntity";

export interface AccountEntity extends BaseEntity<"Account"> {
  userId: string;
  provider: AuthProviderName;
  accountId: string;
}
