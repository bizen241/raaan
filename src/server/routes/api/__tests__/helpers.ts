import { createRequest, createResponse } from "node-mocks-http";
import * as uuid from "uuid";
import { Permission } from "../../../../shared/api/entities";
import { createSession, createUser, SessionEntity, UserEntity } from "../../../database/entities";

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
  Read: createUserFromPermission("Read"),
  Guest: createUserFromPermission("Guest"),
  Ghost: createUserFromPermission("Ghost")
};

const createSessionFromPermission = (permission: Permission) =>
  createSession({
    user: users[permission],
    sessionId: uuid(),
    expireAt: new Date(),
    userAgent: "user-agent"
  });

export const sessions: { [P in Permission]: SessionEntity } = {
  Owner: createSessionFromPermission("Owner"),
  Admin: createSessionFromPermission("Admin"),
  Write: createSessionFromPermission("Write"),
  Read: createSessionFromPermission("Read"),
  Guest: createSessionFromPermission("Guest"),
  Ghost: createSessionFromPermission("Ghost")
};

export const createHttpMocks = (permission: Permission) => {
  const req = createRequest();
  const res = createResponse();

  req.session = sessions[permission];

  req.session.user.createdAt = new Date();
  req.session.user.updatedAt = new Date();

  return { req, res };
};
