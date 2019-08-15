import { OpenAPIV3 } from "openapi-types";
import { Env } from "../env";
import { SaveParamsMapSchema } from "./request/schema/save";
import { SearchParamsMapSchema } from "./request/schema/search";
import { securitySchemes } from "./security";

export const createApiDoc = (_: Env): OpenAPIV3.Document => ({
  openapi: "3.0.2",
  info: {
    title: "Raan",
    version: "0.0.0"
  },
  servers: [
    {
      url: "/api"
    }
  ],
  paths: {},
  components: {
    parameters: {
      ...headerParametersSchema,
      ...pathParametersSchema,
      ...generateQueryParameterSchema()
    },
    requestBodies: generateRequestBodiesSchema(),
    responses: responsesSchema,
    securitySchemes
  }
});

const headerParametersSchema: { [key: string]: OpenAPIV3.ParameterObject } = {
  CustomHeader: {
    in: "header",
    name: "X-Requested-With",
    schema: {
      type: "string",
      default: "Fetch"
    },
    required: true
  }
};

const pathParametersSchema: { [key: string]: OpenAPIV3.ParameterObject } = {
  EntityId: {
    in: "path",
    name: "id",
    schema: {
      type: "string",
      format: "uuid"
    }
  }
};

const generateQueryParameterSchema = () => {
  const searchParamsSchemaMap = SearchParamsMapSchema.properties as { [key: string]: OpenAPIV3.SchemaObject };
  const queryParametersMap: { [key: string]: OpenAPIV3.ParameterObject } = {};

  Object.entries(searchParamsSchemaMap).forEach(([entityType, searchParamsSchema]) => {
    queryParametersMap[entityType] = {
      in: "query",
      name: "query",
      schema: searchParamsSchema
    };
  });

  return queryParametersMap;
};

const generateRequestBodiesSchema = () => {
  const saveParamsSchemaMap = SaveParamsMapSchema.properties as { [key: string]: OpenAPIV3.SchemaObject };
  const requestBodies: { [key: string]: OpenAPIV3.RequestBodyObject } = {};

  Object.entries(saveParamsSchemaMap).forEach(
    ([entityType, schema]) =>
      (requestBodies[entityType] = {
        content: {
          "application/json": {
            schema
          }
        },
        required: true
      })
  );

  return requestBodies;
};

const responsesSchema: OpenAPIV3.ComponentsObject["responses"] = {
  Response: {
    description: "response",
    content: {
      "application/json": {
        schema: {
          type: "object"
        }
      }
    }
  },
  Error: {
    description: "error",
    content: {
      "application/json": {
        schema: {
          type: "object"
        }
      }
    }
  }
};
