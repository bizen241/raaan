import * as bodyParser from "body-parser";
import { Express } from "express";
import { initialize } from "express-openapi";
import { resolve } from "path";
import * as swagger from "swagger-ui-express";
import { Env } from "../env";
import { createApiDoc } from "./doc";
import { securityHandlers } from "./security";

export const prepareApi = (env: Env, app: Express) => {
  initialize({
    apiDoc: createApiDoc(env),
    app,
    docsPath: "/docs",
    consumesMiddleware: {
      "application/json": bodyParser.json()
    },
    errorMiddleware: (err, _, res, __) => {
      res.status(err.status).json(err);
    },
    paths: resolve(process.cwd(), "out/server/routes/api"),
    pathsIgnore: /__tests__/,
    securityHandlers
  });

  if (env.server.host === "localhost") {
    app.use("/api/docs/ui", swagger.serve, swagger.setup(null, { swaggerUrl: "/api/docs" }));
  }
};
