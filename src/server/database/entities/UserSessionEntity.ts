import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { UserEntity } from "./UserEntity";

@Entity()
export class UserSessionEntity extends BaseEntity<"UserSession"> {
  type: "UserSession" = "UserSession";

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @Column({ type: "uuid", unique: true })
  sessionId!: string;

  @Column()
  userAgent!: string;

  @Column({ default: 0 })
  accessCount!: number;

  @Column("timestamp without time zone")
  expireAt!: Date;
}

interface SessionConstructor {
  user: UserEntity;
  sessionId: string;
  userAgent: string;
  expireAt: Date;
}

export const createUserSession = ({ user, sessionId, userAgent, expireAt }: SessionConstructor) => {
  const session = new UserSessionEntity();

  if (user !== undefined) {
    session.user = user;
  }
  if (sessionId !== undefined) {
    session.sessionId = sessionId;
  }
  if (userAgent !== undefined) {
    session.userAgent = userAgent;
  }
  if (expireAt !== undefined) {
    session.expireAt = expireAt;
  }

  return session;
};
