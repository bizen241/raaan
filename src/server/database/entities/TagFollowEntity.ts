import { Entity, ManyToOne } from "typeorm";
import { BaseFollowClass } from "./BaseFollowClass";
import { TagEntity } from "./TagEntity";
import { UserEntity } from "./UserEntity";

@Entity("tag-follows")
export class TagFollowEntity extends BaseFollowClass<TagEntity> {
  type: "TagFollow" = "TagFollow";

  @ManyToOne(() => TagEntity, {
    onDelete: "CASCADE"
  })
  target?: TagEntity;

  constructor(target: TagEntity, user: UserEntity) {
    super(user);

    this.target = target;
  }
}
