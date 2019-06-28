import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_sessions")
export class UserSessionEntity extends BaseEntityClass {
  type: "UserSession" = "UserSession";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
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
  accessCount: number = 0;

  @Column()
  deviceType: string = "";

  @Column()
  deviceName: string = "";

  @Column()
  os: string = "";

  @Column()
  browser: string = "";

  constructor(user: UserEntity, sessionId: string, userAgent?: UserAgent) {
    super();

    this.user = user;
    this.sessionId = sessionId;

    if (userAgent !== undefined) {
      this.deviceType = userAgent.deviceType;
      this.deviceName = userAgent.deviceName;
      this.os = userAgent.os;
      this.browser = userAgent.browser;
    }
  }
}

interface UserAgent {
  deviceType: string;
  deviceName: string;
  os: string;
  browser: string;
}
