import { Express } from "express";
import { initialize } from "express-openapi";
import { resolve } from "path";
import * as swagger from "swagger-ui-express";
import { ProcessEnv } from "../env";
import { createApiDoc } from "./doc";

export const prepareApi = (processEnv: ProcessEnv, app: Express) => {
  initialize({
    apiDoc: createApiDoc(processEnv),
    app,
    docsPath: "/docs",
    paths: resolve(process.cwd(), "out/server/routes/api")
  });

  app.use("/api/docs/ui", swagger.serve, swagger.setup(null, { swaggerUrl: "/api/docs" }));
};
