import { NextFunction } from "connect";
import { Request, RequestHandler, Response } from "express";
import { OperationFunction } from "express-openapi";
import createError, { HttpError } from "http-errors";
import { OpenAPIV3 } from "openapi-types";
import { EntityManager, getManager, SelectQueryBuilder } from "typeorm";
import { endpoints } from "../../shared/api/endpoint";
import { EntityType, Permission } from "../../shared/api/entities";
import { EntityTypeToParams } from "../../shared/api/request/params";
import { apiVersion } from "../../shared/api/version";
import { Entity, UserEntity } from "../database/entities";
import { getGuestUser } from "../database/setup/guest";
import { responseFindResult, responseSearchResult } from "./response";
import entityTypeToParamsSchema from "./schema.json";

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
        default: "Fetch",
      },
      required: true,
    },
    {
      in: "header",
      name: "X-Api-Version",
      schema: {
        type: "string",
        default: apiVersion.toString(),
      },
      required: true,
    },
  ];

  if (hasId) {
    parameters.push({
      in: "path",
      name: "id",
      schema: {
        type: "string",
        format: "uuid",
      },
    });
  }

  if (hasQuery) {
    parameters.push({
      in: "query",
      name: "query",
      schema: entityTypeToParamsSchema[entityType] as OpenAPIV3.SchemaObject,
    });
  }

  const requestBody: OpenAPIV3.RequestBodyObject | undefined = hasBody
    ? {
        content: {
          "application/json": {
            schema: entityTypeToParamsSchema[entityType] as OpenAPIV3.SchemaObject,
          },
        },
        required: true,
      }
    : undefined;

  const responses: OpenAPIV3.ResponsesObject = {
    200: {
      $ref: "#/components/responses/Response",
    },
    default: {
      $ref: "#/components/responses/Error",
    },
  };

  return {
    summary: "",
    tags: [tag || endpoints[entityType]],
    parameters,
    requestBody,
    responses,
    security: [
      {
        [permission]: [],
      },
    ],
  };
};

export const errorBoundary = (
  fn: (req: Request, res: Response, next: NextFunction, currentUser: UserEntity) => Promise<any>
): RequestHandler => async (req, res, next) => {
  const currentUser = req.user || (await getGuestUser());

  res.setHeader("X-Api-Version", apiVersion);

  await fn(req, res, next, currentUser).catch((e: HttpError) => {
    if (e.status === undefined) {
      console.log(e);
    }

    next(e);
  });
};

export const existOrFail = <T>(target: T | undefined) => {
  if (target === undefined) {
    throw createError(500);
  }

  return target;
};

interface OperationFunctionParams {
  req: Request;
  res: Response;
  currentUser: UserEntity;
  manager: EntityManager;
}

type GetOperationFunction = (params: OperationFunctionParams & { id: string }) => Promise<Entity[]>;

export const createGetOperation = (entityType: EntityType, permission: Permission, fn: GetOperationFunction) => {
  const operation: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
    const manager = getManager();
    const id = req.params.id;

    const entities = await fn({ req, res, currentUser, manager, id });

    responseFindResult(req, res, ...entities);
  });

  operation.apiDoc = createOperationDoc({
    entityType,
    permission,
    hasId: true,
  });

  return operation;
};

type SearchOperationFunction<T extends EntityType> = (
  params: OperationFunctionParams & { params: EntityTypeToParams[T] }
) => Promise<SelectQueryBuilder<Entity>>;

export const createSearchOperation = <T extends EntityType>(
  entityType: T,
  permission: Permission,
  fn: SearchOperationFunction<T>
) => {
  const operation: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
    const manager = getManager();
    const params = req.query as EntityTypeToParams[T];

    const query = await fn({ req, res, currentUser, manager, params });

    const { searchLimit, searchOffset } = params;

    query.take(searchLimit);
    query.skip(searchOffset);

    const [entities, count] = await query.getManyAndCount();

    responseSearchResult(req, res, entities, count);
  });

  operation.apiDoc = createOperationDoc({
    entityType,
    permission,
    hasQuery: true,
  });

  return operation;
};

type PostOperationFunction<T extends EntityType> = (
  params: OperationFunctionParams & { params: EntityTypeToParams[T] }
) => Promise<Entity[]>;

export const createPostOperation = <T extends EntityType>(
  entityType: T,
  permission: Permission,
  fn: PostOperationFunction<T>
) => {
  const operation: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
    await getManager().transaction(async (manager) => {
      const params = req.body;

      const entities = await fn({ req, res, currentUser, manager, params });

      responseFindResult(req, res, ...entities);
    });
  });

  operation.apiDoc = createOperationDoc({
    entityType,
    permission,
    hasBody: true,
  });

  return operation;
};

type PatchOperationFunction<T extends EntityType> = (
  params: OperationFunctionParams & { id: string; params: EntityTypeToParams[T] }
) => Promise<Entity[]>;

export const createPatchOperation = <T extends EntityType>(
  entityType: T,
  permission: Permission,
  fn: PatchOperationFunction<T>
) => {
  const operation: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
    await getManager().transaction(async (manager) => {
      const id = req.params.id;
      const params = req.body;

      const entities = await fn({ req, res, currentUser, manager, id, params });

      responseFindResult(req, res, ...entities);
    });
  });

  operation.apiDoc = createOperationDoc({
    entityType,
    permission,
    hasId: true,
    hasBody: true,
  });

  return operation;
};

type DeleteOperationFunction = (params: OperationFunctionParams & { id: string }) => Promise<Entity[]>;

export const createDeleteOperation = (entityType: EntityType, permission: Permission, fn: DeleteOperationFunction) => {
  const operation: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
    const manager = getManager();
    const id = req.params.id;

    const entities = await fn({ req, res, currentUser, manager, id });

    responseFindResult(req, res, ...entities);
  });

  operation.apiDoc = createOperationDoc({
    entityType,
    permission,
    hasId: true,
  });

  return operation;
};
