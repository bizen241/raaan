import { parse, serialize } from "cookie";
import { sign, unsign } from "cookie-signature";
import { Request, Response } from "express";

const cookieName = "sid";

export const setSessionId = (req: Request, res: Response) => {
  const { secret } = req;
  const { sessionId } = req.session;

  const signedSessionId = sign(sessionId, secret);
  const sessionIdCookie = serialize(cookieName, signedSessionId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: req.hostname === "localhost" ? false : true
  });

  res.setHeader("set-cookie", sessionIdCookie);
};

export const getSessionId = (req: Request) => {
  const { secret } = req;
  const cookieHeader = req.headers.cookie;
  if (cookieHeader === undefined) {
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
