import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity()
export class UserSessionEntity extends BaseEntityClass {
  type: "UserSession" = "UserSession";

  @Column("uuid")
  userId: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  user?: UserEntity;

  @Column({ type: "uuid", unique: true })
  sessionId!: string;

  @Column()
  userAgent: string = "";

  @Column()
  accessCount: number = 0;

  @Column("timestamp without time zone")
  expireAt!: Date;

  constructor(user: UserEntity) {
    super();

    this.userId = user.id;
  }
}
