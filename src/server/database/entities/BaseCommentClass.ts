import { Column, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

export abstract class BaseCommentClass<E extends BaseEntityClass> extends BaseEntityClass {
  target?: E;
  @RelationId((following: BaseCommentClass<E>) => following.target)
  targetId!: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  author?: UserEntity;
  @RelationId((following: BaseCommentClass<E>) => following.author)
  authorId!: string;

  @Column()
  body: string;

  constructor(author: UserEntity, body: string) {
    super();

    this.author = author;
    this.body = body;
  }
}
