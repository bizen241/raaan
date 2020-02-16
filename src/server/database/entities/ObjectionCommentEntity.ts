import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ObjectionEntity } from "./ObjectionEntity";
import { UserEntity } from "./UserEntity";

@Entity("objection_comments")
export class ObjectionCommentEntity extends BaseEntityClass<"ObjectionComment"> {
  readonly type = "ObjectionComment";

  @ManyToOne(() => ObjectionEntity, {
    onDelete: "CASCADE"
  })
  target?: ObjectionEntity;
  @RelationId((objectionComment: ObjectionCommentEntity) => objectionComment.target)
  targetId!: EntityId<"Objection">;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  author?: UserEntity;
  @RelationId((objectionComment: ObjectionCommentEntity) => objectionComment.author)
  authorId!: EntityId<"User">;

  @Column()
  body: string;

  constructor(target: ObjectionEntity, author: UserEntity, body: string) {
    super();

    this.target = target;
    this.author = author;
    this.body = body;
  }
}
