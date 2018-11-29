import { HttpError } from "http-errors";
import { createRequest, createResponse } from "node-mocks-http";
import { Permission } from "../../../../shared/api/entities";
import { sessions } from "../../../session/__tests__/helpers";

export const createHttpMocks = (permission: Permission) => {
  const req = createRequest();
  const res = createResponse();

  req.session = sessions[permission];

  req.session.user.createdAt = new Date();
  req.session.user.updatedAt = new Date();

  const next = (error: HttpError) => {
    res.status(error.statusCode);
  };

  return { req, res, next };
};
