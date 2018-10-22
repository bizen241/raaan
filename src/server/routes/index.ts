import { Router } from "express";
import { join } from "path";

export const router = Router();

const htmlPath = join(process.cwd(), "assets/index.html");

router.get("*", (_, res) => res.sendFile(htmlPath));
