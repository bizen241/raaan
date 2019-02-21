import { OpenAPIV3 } from "openapi-types";
import { getSchema } from "../schema";

export const responsesSchema: OpenAPIV3.ComponentsObject["responses"] = {
  EntityStore: {
    description: "get",
    content: {
      "application/json": {
        schema: getSchema("/src/shared/api/response/entity.ts", "EntityStore")
      }
    }
  },
  SearchResponse: {
    description: "search",
    content: {
      "application/json": {
        schema: getSchema("/src/shared/api/response/search.ts", "SearchResponse")
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
