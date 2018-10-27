import { serialize } from "cookie";
import { sign } from "cookie-signature";
import * as httpMocks from "node-mocks-http";
import * as uuid from "uuid";
import { testProcessEnv } from "../../__tests__/helpers";
import { getSessionId, setSessionId } from "../cookie";

test("failed to set sessionId", () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();

  const session = setSessionId(req, res);

  expect(session).toEqual(null);
  expect(res.getHeader("set-cookie")).toEqual(undefined);
});

test("multiple cookies", () => {
  const sessionId = uuid();

  const req = httpMocks.createRequest();

  req.headers.cookie = [
    serialize("sid", sign(sessionId, testProcessEnv.sessionSecret)),
    serialize("another cookie", "value")
  ];
  req.secret = testProcessEnv.sessionSecret;

  expect(getSessionId(req)).toEqual(sessionId);
});

test("invalid session", () => {
  const req = httpMocks.createRequest({
    headers: {
      cookie: serialize("sid", sign(uuid(), "old secret"))
    }
  });

  req.secret = testProcessEnv.sessionSecret;

  expect(getSessionId(req)).toEqual(null);
});
