import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { TagEntity } from "./TagEntity";
import { UserEntity } from "./UserEntity";

@Entity("tag_follows")
export class TagFollowEntity extends BaseEntityClass<"TagFollow"> {
  readonly type = "TagFollow";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  follower?: UserEntity;
  @RelationId((tagFollow: TagFollowEntity) => tagFollow.follower)
  followerId!: EntityId<"User">;

  @ManyToOne(() => TagEntity, {
    onDelete: "CASCADE",
  })
  target?: TagEntity;
  @RelationId((tagFollow: TagFollowEntity) => tagFollow.target)
  targetId!: EntityId<"Tag">;

  @Column("datetime")
  checkedAt: Date = new Date();

  constructor(target: TagEntity, follower: UserEntity) {
    super();

    this.follower = follower;
    this.target = target;
  }
}
