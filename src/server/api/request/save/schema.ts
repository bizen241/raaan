import { OpenAPIV3 } from "openapi-types";
import { getSchema } from "../../schema";

export const generateRequestBodiesSchema = () => {
  const saveParamsMapSchema = getSchema("/src/server/api/request/save/params.ts", "SaveParamsMap");
  const saveParamsSchemaMap = saveParamsMapSchema.properties as { [key: string]: OpenAPIV3.SchemaObject };
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
