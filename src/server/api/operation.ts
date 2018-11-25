import { NextFunction } from "connect";
import { Request, RequestHandler, Response } from "express";
import * as createError from "http-errors";
import { OpenAPIV2 } from "openapi-types";
import { Permission } from "../../shared/api/entities";

type Tag = "user" | "users" | "user-accounts" | "user-sessions";

interface Parameters {
  summary: string;
  tag: Tag;
  permission: Permission;
}

const responses: OpenAPIV2.ResponsesObject = {
  200: {
    description: "OK",
    schema: {
      $ref: "#/definitions/Response"
    }
  },
  default: {
    description: "Error",
    schema: {
      $ref: "#/definitions/Error"
    }
  }
};

export const createApiDoc = ({ summary, tag, permission }: Parameters): OpenAPIV2.OperationObject => ({
  summary,
  tags: [tag],
  responses,
  security: [
    {
      [permission]: []
    }
  ]
});

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const errorBoundary = (fn: AsyncRequestHandler): RequestHandler => async (req, res, next) => {
  await fn(req, res, next).catch(() => {
    next(createError(500));
  });
};
