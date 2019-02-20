import { OpenAPIV3 } from "openapi-types";
import { getSchema } from "../schema";

export const responses: OpenAPIV3.ComponentsObject["responses"] = {
  EntityStore: {
    description: "entities",
    content: {
      "application/json": {
        schema: getSchema("/src/shared/api/response/entity.ts", "EntityStore")
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
