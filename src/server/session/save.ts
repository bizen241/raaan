import { Request, Response } from "express";
import { getManager } from "typeorm";
import { setSessionId } from "./cookie";

export const saveSession = async (req: Request, res: Response) => {
  const session = setSessionId(req, res);
  if (session == null) {
    return;
  }

  await getManager().save(session);
};
