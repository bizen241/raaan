import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { Lang, Theme } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_configs")
export class UserConfigEntity extends BaseEntityClass {
  type: "UserConfig" = "UserConfig";

  @OneToOne(() => UserEntity, user => user.config, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user?: UserEntity;
  @RelationId((config: UserConfigEntity) => config.user)
  userId!: string;

  @Column()
  lang: Lang = "default";

  @Column()
  theme: Theme = "default";
}
