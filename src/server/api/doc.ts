import { OpenAPIV3 } from "openapi-types";
import { ProcessEnv } from "../env";
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
    schemas: {
      Response: {
        type: "object"
      },
      Error: {
        type: "object"
      }
    },
    securitySchemes
  }
});
