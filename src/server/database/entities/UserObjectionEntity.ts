import { Entity, OneToOne } from "typeorm";
import { BaseObjectionClass } from "./BaseObjectionClass";
import { UserEntity } from "./UserEntity";

@Entity("user_objection")
export class UserObjectionEntity extends BaseObjectionClass<UserEntity> {
  type: "UserObjection" = "UserObjection";

  @OneToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  target?: UserEntity;
}
