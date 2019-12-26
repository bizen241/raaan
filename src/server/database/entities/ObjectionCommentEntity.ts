import { Entity, ManyToOne } from "typeorm";
import { BaseCommentClass } from "./BaseCommentClass";
import { ObjectionEntity } from "./ObjectionEntity";
import { UserEntity } from "./UserEntity";

@Entity("objection_comments")
export class ObjectionCommentEntity extends BaseCommentClass<ObjectionEntity> {
  type: "ObjectionComment" = "ObjectionComment";

  @ManyToOne(() => ObjectionEntity, {
    onDelete: "CASCADE"
  })
  target?: ObjectionEntity;

  constructor(target: ObjectionEntity, author: UserEntity, body: string) {
    super(author, body);

    this.target = target;
  }
}
