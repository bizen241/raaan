import { NextFunction } from "connect";
import { Request, RequestHandler, Response } from "express";
import * as createError from "http-errors";
import { OpenAPIV3 } from "openapi-types";
import { EntityObject, Permission } from "../../shared/api/entities";

export interface PathParams {
  id?: string;
}

type Tag = "contents" | "content-branches" | "content-revisions" | "user" | "users" | "user-accounts" | "user-sessions";

interface OperationDocument<E extends EntityObject> {
  summary: string;
  tag: Tag;
  permission: Permission;
  path?: Array<keyof PathParams>;
  query?: { [P in keyof E]?: null };
  body?: OpenAPIV3.RequestBodyObject;
  parameters?: OpenAPIV3.ParameterObject[];
}

const responses: OpenAPIV3.ResponsesObject = {
  200: {
    description: "OK",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Response"
        }
      }
    }
  },
  default: {
    description: "Error",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Error"
        }
      }
    }
  }
};

export const createOperationDoc = <E extends EntityObject>(
  document: OperationDocument<E>
): OpenAPIV3.OperationObject => {
  const { summary, tag, permission, body, parameters } = document;

  return {
    summary,
    tags: [tag],
    responses,
    parameters,
    requestBody: body,
    security: [
      {
        [permission]: []
      }
    ]
  };
};

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const errorBoundary = (fn: AsyncRequestHandler): RequestHandler => async (req, res, next) => {
  await fn(req, res, next).catch(e => {
    console.log(e);

    next(createError(500));
  });
};
