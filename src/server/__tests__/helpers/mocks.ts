import { HttpError } from "http-errors";
import { createRequest, createResponse } from "node-mocks-http";
import { Permission } from "../../../shared/api/entities";
import { users } from "./entities";

export const createHttpMocks = (permission: Permission) => {
  const req = createRequest();
  const res = createResponse();

  req.session = {
    user: users[permission]
  } as any;

  const next = (error: HttpError) => {
    res.status(error.statusCode);
  };

  return { req, res, next };
};
