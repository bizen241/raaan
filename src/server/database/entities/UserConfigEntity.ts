import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId, UserSettings } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_configs")
export class UserConfigEntity extends BaseEntityClass<"UserConfig"> {
  readonly type = "UserConfig";

  @OneToOne(
    () => UserEntity,
    user => user.config,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn()
  user?: UserEntity;
  @RelationId((config: UserConfigEntity) => config.user)
  userId!: EntityId<"User">;

  @Column("json")
  settings: Partial<UserSettings> = {};
}
