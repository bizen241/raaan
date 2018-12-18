import { getManager } from "typeorm";
import * as uuid from "uuid";
import { Permission } from "../../../shared/api/entities";
import { createUser, createUserSession, UserEntity, UserSessionEntity } from "../../database/entities";

const createUserFromPermission = (permission: Permission) =>
  createUser({
    id: uuid(),
    name: permission,
    permission
  });

export const users: { [P in Permission]: UserEntity } = {
  Owner: createUserFromPermission("Owner"),
  Admin: createUserFromPermission("Admin"),
  Write: createUserFromPermission("Write"),
  Guest: createUserFromPermission("Guest"),
  Ghost: createUserFromPermission("Ghost")
};

const createSessionFromPermission = (permission: Permission) =>
  createUserSession({
    user: users[permission],
    sessionId: uuid(),
    expireAt: new Date(),
    userAgent: "user-agent"
  });

export const sessions: { [P in Permission]: UserSessionEntity } = {
  Owner: createSessionFromPermission("Owner"),
  Admin: createSessionFromPermission("Admin"),
  Write: createSessionFromPermission("Write"),
  Guest: createSessionFromPermission("Guest"),
  Ghost: createSessionFromPermission("Ghost")
};

export const insertUsers = () => getManager().save(Object.values(users));
export const insertSessions = () => getManager().save(Object.values(sessions));
