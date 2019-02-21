import { OpenAPIV3 } from "openapi-types";
import { getSchema } from "../../schema";

export const generateQueryParameterSchema = () => {
  const searchParamsMapSchema = getSchema("/src/server/api/request/search/params.ts", "SearchParamsMap");
  const searchParamsSchemaMap = searchParamsMapSchema.properties as { [key: string]: OpenAPIV3.SchemaObject };
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
