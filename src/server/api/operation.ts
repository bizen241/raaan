import { NextFunction } from "connect";
import { Request, RequestHandler, Response } from "express";
import * as createError from "http-errors";
import { OpenAPIV3 } from "openapi-types";
import { endpoints } from "../../shared/api/endpoint";
import { EntityType, Permission } from "../../shared/api/entities";
import { UserEntity } from "../database/entities";
import { getGuestUser } from "../database/setup/guest";
import { entityTypeToParamsSchema } from "./request/schema";

export interface PathParams {
  id: string;
}

interface OperationDocument {
  entityType: EntityType;
  permission: Permission;
  tag?: string;
  hasId?: boolean;
  hasQuery?: boolean;
  hasBody?: boolean;
}

export const createOperationDoc = (document: OperationDocument): OpenAPIV3.OperationObject => {
  const { entityType, permission, tag, hasId, hasQuery, hasBody } = document;

  const parameters: OpenAPIV3.ParameterObject[] = [
    {
      in: "header",
      name: "X-Requested-With",
      schema: {
        type: "string",
        default: "Fetch"
      },
      required: true
    }
  ];

  if (hasId) {
    parameters.push({
      in: "path",
      name: "id",
      schema: {
        type: "string",
        format: "uuid"
      }
    });
  }

  if (hasQuery) {
    parameters.push({
      in: "query",
      name: "query",
      schema: entityTypeToParamsSchema[entityType]
    });
  }

  const requestBody: OpenAPIV3.RequestBodyObject | undefined = hasBody
    ? {
        content: {
          "application/json": {
            schema: entityTypeToParamsSchema[entityType]
          }
        },
        required: true
      }
    : undefined;

  const responses: OpenAPIV3.ResponsesObject = {
    200: {
      $ref: "#/components/responses/Response"
    },
    default: {
      $ref: "#/components/responses/Error"
    }
  };

  return {
    summary: "",
    tags: [tag || endpoints[entityType]],
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

export const errorBoundary = (
  fn: (req: Request, res: Response, next: NextFunction, currentUser: UserEntity) => Promise<any>
): RequestHandler => async (req, res, next) => {
  const currentUser = req.user || (await getGuestUser());

  await fn(req, res, next, currentUser).catch(e => {
    console.log(e);

    next(createError(500));
  });
};
