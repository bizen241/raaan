import { OpenAPIV3 } from "openapi-types";
import { ProcessEnv } from "../env";
import { generateRequestBodiesSchema } from "./request/save/schema";
import { generateQueryParameterSchema } from "./request/search/schema";
import { responsesSchema } from "./response/schema";
import { securitySchemes } from "./security";

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
const queryParametersSchema = generateQueryParameterSchema();
const requestBodiesSchema = generateRequestBodiesSchema();

export const createApiDoc = (_: ProcessEnv): OpenAPIV3.Document => ({
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
      ...pathParametersSchema,
      ...queryParametersSchema
    },
    requestBodies: requestBodiesSchema,
    responses: responsesSchema,
    securitySchemes
  }
});
