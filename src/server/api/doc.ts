import { OpenAPIV2 } from "openapi-types";
import { ProcessEnv } from "../env";

export const createApiDoc = (_: ProcessEnv): OpenAPIV2.Document => ({
  swagger: "2.0",
  info: {
    title: "Raaan",
    version: "0.0.0"
  },
  basePath: "/api",
  paths: {}
});
