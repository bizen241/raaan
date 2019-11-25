import { AuthProviderName } from "../../../shared/auth";
import { UserEntity } from "../../database/entities";

export type AuthStrategyCallback = (err: any, user?: UserEntity | false, reason?: AuthStrategyFailureReason) => void;

export interface AuthStrategyFailureReason {
  message?: string;
  provider?: AuthProviderName;
}
