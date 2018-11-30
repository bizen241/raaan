import { NextFunction } from "connect";
import { Request, RequestHandler, Response } from "express";
import * as createError from "http-errors";
import { OpenAPIV2 } from "openapi-types";
import { EntityObject, Permission } from "../../shared/api/entities";

export interface PathParams {
  id?: string;
}

type Tag = "user" | "users" | "user-accounts" | "user-sessions";

interface OperationDocument<E extends EntityObject> {
  summary: string;
  tag: Tag;
  permission: Permission;
  path?: Array<keyof PathParams>;
  query?: { [P in keyof E]?: null };
  body?: { [P in keyof E]?: null };
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

const createOperationParameters = (location: "path" | "query" | "body", names: string[]): OpenAPIV2.Parameters => {
  const required = location === "path" ? true : undefined;

  return names.map(name => ({
    in: location,
    type: "string",
    name,
    required
  }));
};

export const createOperationDoc = <E extends EntityObject>(
  document: OperationDocument<E>
): OpenAPIV2.OperationObject => {
  const { summary, tag, permission, path = [], query = {}, body = {} } = document;

  const parameters = [
    ...createOperationParameters("path", path),
    ...createOperationParameters("query", Object.keys(query)),
    ...createOperationParameters("body", Object.keys(body))
  ];

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
