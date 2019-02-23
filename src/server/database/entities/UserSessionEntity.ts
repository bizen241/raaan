import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity()
export class UserSessionEntity extends BaseEntityClass<"UserSession"> {
  type: "UserSession" = "UserSession";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
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

interface UserSessionConstructor {
  id?: string;
  user: UserEntity;
  sessionId: string;
  userAgent: string;
  expireAt: Date;
}

export const createUserSession = ({ id, user, sessionId, userAgent, expireAt }: UserSessionConstructor) => {
  const userSession = new UserSessionEntity();

  if (id !== undefined) {
    userSession.id = id;
  }

  userSession.user = user;
  userSession.sessionId = sessionId;
  userSession.userAgent = userAgent;
  userSession.expireAt = expireAt;

  return userSession;
};
