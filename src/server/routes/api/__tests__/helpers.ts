import { HttpError } from "http-errors";
import { createRequest, createResponse } from "node-mocks-http";
import { Permission } from "../../../../shared/api/entities";
import { sessions, users } from "../../../session/__tests__/helpers";

export const createHttpMocks = (permission: Permission) => {
  const req = createRequest();
  const res = createResponse();

  req.session = sessions[permission];

  req.user = users[permission];
  req.user.createdAt = new Date();
  req.user.updatedAt = new Date();

  const next = (error: HttpError) => {
    res.status(error.statusCode);
  };

  return { req, res, next };
};
