import { Base } from "./Base";

export interface UserSession extends Base<"UserSession"> {
  userAgent: string;
}
