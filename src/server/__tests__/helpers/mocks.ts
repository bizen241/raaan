import { HttpError } from "http-errors";
import { createRequest, createResponse } from "node-mocks-http";
import { Permission } from "../../../shared/api/entities";
import { insertUser } from "./entities";

export const createHttpMocks = async (permission: Permission) => {
  const req = createRequest();
  const res = createResponse();

  const { account, config, user } = await insertUser(permission);

  req.user = user;
  req.session = {} as any;

  const next = (error: HttpError) => {
    res.status(error.statusCode);
  };

  return { req, res, next, account, config, user };
};
