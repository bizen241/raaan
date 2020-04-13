import { OpenAPIV3 } from "openapi-types";
import { Env } from "../env";
import { securitySchemes } from "./security";

export const createApiDoc = (_: Env): OpenAPIV3.Document => ({
  openapi: "3.0.2",
  info: {
    title: "Raan",
    version: "0.0.0",
  },
  servers: [
    {
      url: "/api",
    },
  ],
  paths: {},
  components: {
    responses,
    securitySchemes,
  },
});

const responses: OpenAPIV3.ComponentsObject["responses"] = {
  Response: {
    description: "response",
    content: {
      "application/json": {
        schema: {
          type: "object",
        },
      },
    },
  },
  Error: {
    description: "error",
    content: {
      "application/json": {
        schema: {
          type: "object",
        },
      },
    },
  },
};
