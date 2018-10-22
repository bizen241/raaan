import * as express from "express";
import { join } from "path";

const htmlPath = join(process.cwd(), "assets/index.html");

export const createApp = (app: express.Express = express()) => {
  app.get("*", (_, res) => {
    res.sendFile(htmlPath);
  });

  return app;
};
