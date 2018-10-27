import { parse, serialize } from "cookie";
import { sign, unsign } from "cookie-signature";
import { Request, Response } from "express";

const cookieName = "sid";

export const setSessionId = (req: Request, res: Response) => {
  const { session, secret } = req;
  if (session === undefined || secret === undefined) {
    return null;
  }

  const { sessionId } = session;
  const signedSessionId = sign(sessionId, secret);

  res.setHeader("set-cookie", serialize(cookieName, signedSessionId));

  return session;
};

export const getSessionId = (req: Request) => {
  const { secret } = req;
  const cookieHeader = req.headers.cookie;
  if (secret === undefined || cookieHeader === undefined) {
    return null;
  }

  const cookieHaderString = Array.isArray(cookieHeader) ? cookieHeader.join(";") : cookieHeader;
  const cookies = parse(cookieHaderString);
  const signedSessionId = cookies[cookieName];
  const sessionId = unsign(signedSessionId, secret);
  if (typeof sessionId === "boolean") {
    return null;
  }

  return sessionId;
};
