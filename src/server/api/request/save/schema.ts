import { OpenAPIV3 } from "openapi-types";
import { EntityType } from "../../../../shared/api/entities";
import { getSchema } from "../../schema";

const saveParamsMapSchema = getSchema("/src/server/api/request/save/params.ts", "SaveParamsMap");

export const saveParamsSchemaMap = saveParamsMapSchema.properties as { [K in EntityType]: OpenAPIV3.SchemaObject };

export const requestBodies: OpenAPIV3.ComponentsObject["requestBodies"] = {};

Object.entries(saveParamsMapSchema.properties || {}).forEach(
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
