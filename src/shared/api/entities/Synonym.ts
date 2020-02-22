import { BaseEntityObject } from "./BaseEntityObject";

export interface Synonym extends BaseEntityObject<"Synonym"> {
  name: string;
  target: string;
}
