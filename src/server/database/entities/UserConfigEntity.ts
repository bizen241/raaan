import { Column, Entity } from "typeorm";
import { Lang, Theme } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity()
export class UserConfigEntity extends BaseEntityClass<"UserConfig"> {
  type: "UserConfig" = "UserConfig";

  @Column()
  lang!: Lang;

  @Column()
  theme!: Theme;
}
