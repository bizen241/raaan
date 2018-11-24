import { Base } from "./Base";

export interface UserSession extends Base<"UserSession"> {
  userId: string;
  userAgent: string;
}
