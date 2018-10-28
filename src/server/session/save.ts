import { Request, Response } from "express";
import { getManager } from "typeorm";
import { setSessionId } from "./cookie";

export const saveSession = async (req: Request, res: Response) => {
  setSessionId(req, res);

  await getManager().save(req.session);
};
