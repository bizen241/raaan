import { serialize } from "cookie";
import { sign } from "cookie-signature";
import * as httpMocks from "node-mocks-http";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { createSessionMiddleware } from "..";
import { testProcessEnv } from "../../__tests__/helpers";
import { TestDatabase } from "../../database/__tests__/helpers";
import { UserConfigEntity, UserEntity, UserSessionEntity } from "../../database/entities";
import { insertSessions, insertUsers } from "./helpers";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

beforeEach(async () => {
  await testDatabase.reset();

  await insertUsers();
  await insertSessions();
});

test("guest user", async done => {
  const req = httpMocks.createRequest({
    method: "GET",
    url: "/"
  });
  const res = httpMocks.createResponse();

  const sessionMiddleware = createSessionMiddleware(testProcessEnv);
  sessionMiddleware(req, res, () => {
    expect(req.user.permission).toEqual("Guest");

    done();
  });
});

test("valid session", async done => {
  const user = new UserEntity("name", "Write", new UserConfigEntity());
  const savedUser = await getManager().save(user);
  const userId = savedUser.id;

  const sessionId = uuid();
  const session = new UserSessionEntity(user);
  session.sessionId = sessionId;
  session.expireAt = new Date();
  session.userAgent = "";

  await getManager().save(session);

  const req = httpMocks.createRequest({
    headers: {
      cookie: serialize("sid", sign(sessionId, testProcessEnv.sessionSecret))
    }
  });
  const res = httpMocks.createResponse();

  const sessionMiddleware = createSessionMiddleware(testProcessEnv);
  sessionMiddleware(req, res, () => {
    expect(req.user.id).toEqual(userId);

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

  const sessionMiddleware = createSessionMiddleware(testProcessEnv);
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

  const sessionMiddleware = createSessionMiddleware(testProcessEnv);
  sessionMiddleware(req, res, () => {
    expect(req.session.sessionId).not.toEqual(sessionId);

    done();
  });
});
