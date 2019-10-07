import { Entity, ManyToOne } from "typeorm";
import { BaseFollowClass } from "./BaseFollowClass";
import { UserEntity } from "./UserEntity";

@Entity("user-follows")
export class UserFollowEntity extends BaseFollowClass<UserEntity> {
  type: "UserFollow" = "UserFollow";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  target?: UserEntity;

  constructor(target: UserEntity, user: UserEntity) {
    super(user);

    this.target = target;
  }
}
