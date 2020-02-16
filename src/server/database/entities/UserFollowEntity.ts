import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_follows")
export class UserFollowEntity extends BaseEntityClass<"UserFollow"> {
  readonly type = "UserFollow";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  follower?: UserEntity;
  @RelationId((userFollow: UserFollowEntity) => userFollow.follower)
  followerId!: EntityId<"User">;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  target?: UserEntity;
  @RelationId((userFollow: UserFollowEntity) => userFollow.target)
  targetId!: EntityId<"Tag">;

  @Column("datetime")
  checkedAt: Date = new Date();

  constructor(target: UserEntity, follower: UserEntity) {
    super();

    this.follower = follower;
    this.target = target;
  }
}
