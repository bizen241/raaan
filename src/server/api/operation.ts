import { NextFunction } from "connect";
import { Request, RequestHandler, Response } from "express";
import * as createError from "http-errors";
import { OpenAPIV2 } from "openapi-types";
import { EntityObject, Permission } from "../../shared/api/entities";

type Tag = "user" | "users" | "user-accounts" | "user-sessions";

interface OperationDocument<E extends EntityObject> {
  summary: string;
  tag: Tag;
  permission: Permission;
  body?: { [P in keyof E]?: null };
  query?: { [P in keyof E]?: null };
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

const createOperationParameters = (location: "body" | "query", source: object = {}): OpenAPIV2.Parameters =>
  Object.keys(source).map(name => ({
    in: location,
    type: "string",
    name
  }));

export const createOperationDoc = <E extends EntityObject>(
  document: OperationDocument<E>
): OpenAPIV2.OperationObject => {
  const { summary, tag, permission, body = {}, query = {} } = document;

  const parameters = [...createOperationParameters("body", body), ...createOperationParameters("query", query)];

  return {
    summary,
    tags: [tag],
    responses,
    parameters,
    security: [
      {
        [permission]: []
      }
    ]
  };
};

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const errorBoundary = (fn: AsyncRequestHandler): RequestHandler => async (req, res, next) => {
  await fn(req, res, next).catch(() => {
    next(createError(500));
  });
};
