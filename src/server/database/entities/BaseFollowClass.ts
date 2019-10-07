import { Column, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

export abstract class BaseFollowClass<E extends BaseEntityClass> extends BaseEntityClass {
  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  follower?: UserEntity;
  @RelationId((following: BaseFollowClass<E>) => following.follower)
  followerId!: string;

  target?: E;
  @RelationId((following: BaseFollowClass<E>) => following.target)
  targetId!: string;

  @Column("datetime")
  checkedAt: Date = new Date();

  constructor(follower: UserEntity) {
    super();

    this.follower = follower;
  }
}
