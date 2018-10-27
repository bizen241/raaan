import { Router } from "express";
import { join } from "path";

export const fallbackRouter = Router();

const htmlPath = join(process.cwd(), "assets/index.html");

fallbackRouter.get("*", (_, res) => res.sendFile(htmlPath));
