import { getManager } from "typeorm";
import * as uuid from "uuid";
import { Permission } from "../../../shared/api/entities";
import { UserConfigEntity, UserEntity, UserSessionEntity } from "../../database/entities";

const createUserFromPermission = (permission: Permission) =>
  new UserEntity(permission, permission, new UserConfigEntity());

export const users: { [P in Permission]: UserEntity } = {
  Owner: createUserFromPermission("Owner"),
  Admin: createUserFromPermission("Admin"),
  Write: createUserFromPermission("Write"),
  Guest: createUserFromPermission("Guest")
};

const createSessionFromPermission = (permission: Permission) => {
  const session = new UserSessionEntity(users[permission]);
  session.sessionId = uuid();
  session.expireAt = new Date();

  return session;
};

export const sessions: { [P in Permission]: UserSessionEntity } = {
  Owner: createSessionFromPermission("Owner"),
  Admin: createSessionFromPermission("Admin"),
  Write: createSessionFromPermission("Write"),
  Guest: createSessionFromPermission("Guest")
};

export const insertUsers = () => getManager().save(Object.values(users));
export const insertSessions = () => getManager().save(Object.values(sessions));
