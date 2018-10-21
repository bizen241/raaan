import * as express from "express";
import { join } from "path";

const htmlPath = join(process.cwd(), "assets/index.html");

export const createApp = () => {
  const app = express();

  app.get("*", (_, res) => {
    res.sendFile(htmlPath);
  });

  return app;
};
