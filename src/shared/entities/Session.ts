import { Base } from "./Base";

export interface Session extends Base<"Session"> {
  userAgent: string;
}
