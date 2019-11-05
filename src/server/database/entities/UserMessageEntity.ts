import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_messages")
export class UserMessageEntity extends BaseEntityClass {
  type: "UserMessage" = "UserMessage";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user?: UserEntity;
  @RelationId((userMessage: UserMessageEntity) => userMessage.user)
  userId!: string;

  @Column()
  body: string;

  constructor(user: UserEntity, body: string) {
    super();

    this.user = user;
    this.body = body;
  }
}
