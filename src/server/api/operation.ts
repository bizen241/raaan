import { NextFunction } from "connect";
import { Request, RequestHandler, Response } from "express";
import * as createError from "http-errors";
import { OpenAPIV3 } from "openapi-types";
import { endpoints } from "../../shared/api/endpoint";
import { EntityType, Permission } from "../../shared/api/entities";
import { UserEntity } from "../database/entities";
import { getGuestUser } from "../database/setup/guest";
import { SaveParamsMapSchema } from "./request/schema/save";

export interface PathParams {
  id: string;
}

interface OperationDocument {
  entityType: EntityType;
  summary: string;
  permission: Permission;
  tag?: string;
  hasId?: boolean;
  hasQuery?: boolean;
  hasBody?: boolean;
}

export const createOperationDoc = (document: OperationDocument): OpenAPIV3.OperationObject => {
  const { entityType, summary, permission, tag, hasId, hasQuery, hasBody } = document;

  const parameters: OpenAPIV3.ReferenceObject[] = [
    {
      $ref: "#/components/parameters/CustomHeader"
    }
  ];

  if (hasId) {
    parameters.push({
      $ref: "#/components/parameters/EntityId"
    });
  }

  if (hasQuery) {
    parameters.push({
      $ref: `#/components/parameters/${entityType}`
    });
  }

  /*
  const requestBody: OpenAPIV3.ReferenceObject | undefined = hasBody
    ? {
        $ref: `#/components/requestBodies/${entityType}`
      }
    : undefined;
  */
  const saveParamsSchemaMap = SaveParamsMapSchema.properties as { [key: string]: OpenAPIV3.SchemaObject };

  const requestBody: OpenAPIV3.RequestBodyObject | undefined = hasBody
    ? {
        content: {
          "application/json": {
            schema: saveParamsSchemaMap[entityType]
          }
        }
      }
    : undefined;

  const responses: OpenAPIV3.ResponsesObject = {
    200: {
      $ref: `#/components/responses/${hasQuery ? "SearchResponse" : "EntityStore"}`
    },
    default: {
      $ref: "#/components/responses/Error"
    }
  };

  return {
    summary,
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
