import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity, BaseEntityConstructor } from "./BaseEntity";
import { UserEntity } from "./UserEntity";

interface SessionConstructor extends BaseEntityConstructor {
  user: UserEntity;
  sessionId: string;
  userAgent: string;
  expireAt: Date;
}

@Entity("sessions")
export class SessionEntity extends BaseEntity<"Session"> {
  type: "Session" = "Session";

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @Column({ type: "uuid", unique: true })
  sessionId!: string;

  @Column()
  userAgent!: string;

  @Column("timestamp without time zone")
  expireAt!: Date;

  constructor({ id, user, sessionId, userAgent, expireAt }: Partial<SessionConstructor> = {}) {
    super(id);

    if (user !== undefined) {
      this.user = user;
    }
    if (sessionId !== undefined) {
      this.sessionId = sessionId;
    }
    if (userAgent !== undefined) {
      this.userAgent = userAgent;
    }
    if (expireAt !== undefined) {
      this.expireAt = expireAt;
    }
  }
}

export const createSession = (params: SessionConstructor) => new SessionEntity(params);
