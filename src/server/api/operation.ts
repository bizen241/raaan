import { NextFunction } from "connect";
import { Request, RequestHandler, Response } from "express";
import * as createError from "http-errors";
import { OpenAPIV3 } from "openapi-types";
import { EntityType, Permission } from "../../shared/api/entities";

export interface PathParams {
  id?: string;
}

const tags: { [P in EntityType]: string } = {
  Content: "contents",
  ContentRevision: "content-revisions",
  ContentTag: "content-tags",
  User: "users",
  UserAccount: "user-accounts",
  UserConfig: "user-configs",
  UserSession: "user-sessions"
};

interface OperationDocument {
  entityType: EntityType;
  summary: string;
  permission: Permission;
  hasId?: boolean;
  hasQuery?: boolean;
  hasBody?: boolean;
}

export const createOperationDoc = (document: OperationDocument): OpenAPIV3.OperationObject => {
  const { entityType, summary, permission, hasId, hasBody } = document;

  const parameters: OpenAPIV3.ReferenceObject[] = [];

  if (hasId) {
    parameters.push({
      $ref: "#/components/parameters/EntityId"
    });
  }

  const requestBody: OpenAPIV3.ReferenceObject | undefined = hasBody
    ? {
        $ref: `#/components/requestBodies/${entityType}`
      }
    : undefined;

  const responses: OpenAPIV3.ResponsesObject = {
    200: {
      $ref: "#/components/responses/EntityStore"
    },
    default: {
      $ref: "#/components/responses/Error"
    }
  };

  return {
    summary,
    tags: [tags[entityType]],
    parameters,
    requestBody,
    responses,
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
