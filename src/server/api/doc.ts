import { OpenAPIV3 } from "openapi-types";
import { ProcessEnv } from "../env";
import { requestBodies } from "./request/save/schema";
import { responses } from "./response/schema";
import { securitySchemes } from "./security";

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
      EntityId: {
        in: "path",
        name: "id",
        schema: {
          type: "string",
          format: "uuid"
        }
      }
    },
    requestBodies,
    responses,
    securitySchemes
  }
});
