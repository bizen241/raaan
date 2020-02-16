import { Column, Entity, JoinColumn, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_messages")
export class UserMessageEntity extends BaseEntityClass<"UserMessage"> {
  readonly type = "UserMessage";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user?: UserEntity;
  @RelationId((userMessage: UserMessageEntity) => userMessage.user)
  userId!: EntityId<"User">;

  @Column()
  body: string;

  constructor(user: UserEntity, body: string) {
    super();

    this.user = user;
    this.body = body;
  }
}
