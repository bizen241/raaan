import { BaseEntityObject } from "./BaseEntityObject";

export interface Synonym extends BaseEntityObject {
  name: string;
  target: string;
}
