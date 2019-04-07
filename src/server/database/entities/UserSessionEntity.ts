import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_sessions")
export class UserSessionEntity extends BaseEntityClass {
  type: "UserSession" = "UserSession";

  @Column("uuid")
  userId: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  user?: UserEntity;

  @Column({
    type: "uuid",
    unique: true
  })
  sessionId: string;

  @Column({ type: "json" })
  data: any = {};

  @Column()
  userAgent: string = "";

  @Column()
  accessCount: number = 0;

  @Column("timestamp without time zone")
  expireAt: Date;

  constructor(user: UserEntity, sessionId: string, expiredAt: Date) {
    super();

    this.userId = user && user.id;
    this.sessionId = sessionId;
    this.expireAt = expiredAt;
  }
}
