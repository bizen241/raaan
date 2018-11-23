import { serialize } from "cookie";
import { sign } from "cookie-signature";
import * as httpMocks from "node-mocks-http";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { createSessionMidleware } from "..";
import { testProcessEnv } from "../../__tests__/helpers";
import { TestDatabase } from "../../database/__tests__/helpers";
import { createUser, createUserSession } from "../../database/entities";
import { insertSessions } from "./helpers";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

beforeEach(async () => {
  await testDatabase.reset();

  await insertSessions();
});

test("guest user", async done => {
  const req = httpMocks.createRequest({
    method: "GET",
    url: "/"
  });
  const res = httpMocks.createResponse();

  const sessionMiddleware = createSessionMidleware(testProcessEnv);
  sessionMiddleware(req, res, () => {
    expect(req.session.user.permission).toEqual("Guest");

    done();
  });
});

test("valid session", async done => {
  const userId = uuid();
  const user = createUser({
    id: userId,
    name: "name",
    permission: "Read"
  });
  await getManager().save(user);

  const sessionId = uuid();
  const session = createUserSession({
    user,
    sessionId,
    userAgent: "",
    expireAt: new Date()
  });
  await getManager().save(session);

  const req = httpMocks.createRequest({
    headers: {
      cookie: serialize("sid", sign(sessionId, testProcessEnv.sessionSecret))
    }
  });
  const res = httpMocks.createResponse();

  const sessionMiddleware = createSessionMidleware(testProcessEnv);
  sessionMiddleware(req, res, () => {
    expect(req.session.user.id).toEqual(userId);

    done();
  });
});

test("invalid session", async done => {
  const sessionId = uuid();

  const req = httpMocks.createRequest({
    headers: {
      cookie: serialize("sid", sign(sessionId, "old secret"))
    }
  });
  const res = httpMocks.createResponse();

  const sessionMiddleware = createSessionMidleware(testProcessEnv);
  sessionMiddleware(req, res, () => {
    expect(req.session.sessionId).not.toEqual(sessionId);

    done();
  });
});

test("deleted session", async done => {
  const sessionId = uuid();

  const req = httpMocks.createRequest({
    headers: {
      cookie: serialize("sid", sign(sessionId, testProcessEnv.sessionSecret))
    }
  });
  const res = httpMocks.createResponse();

  const sessionMiddleware = createSessionMidleware(testProcessEnv);
  sessionMiddleware(req, res, () => {
    expect(req.session.sessionId).not.toEqual(sessionId);

    done();
  });
});
