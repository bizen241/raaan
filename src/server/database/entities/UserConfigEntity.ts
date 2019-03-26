import { Column, Entity, OneToOne } from "typeorm";
import { Lang, Theme } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_configs")
export class UserConfigEntity extends BaseEntityClass {
  type: "UserConfig" = "UserConfig";

  @OneToOne(() => UserEntity, user => user.configId)
  user?: UserEntity;

  @Column()
  lang: Lang = "default";

  @Column()
  theme: Theme = "default";
}
