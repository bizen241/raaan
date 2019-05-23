import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_sessions")
export class UserSessionEntity extends BaseEntityClass {
  type: "UserSession" = "UserSession";

  @ManyToOne(() => UserEntity, {
    cascade: ["remove"]
  })
  user?: UserEntity;
  @RelationId((userSession: UserSessionEntity) => userSession.user)
  userId!: string;

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

    this.user = user;
    this.sessionId = sessionId;
    this.expireAt = expiredAt;
  }
}
