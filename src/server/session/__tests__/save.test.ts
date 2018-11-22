import * as httpMocks from "node-mocks-http";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { testProcessEnv } from "../../__tests__/helpers";
import { TestDatabase } from "../../database/__tests__/helpers";
import { createSession, createUser, SessionEntity } from "../../database/entities";
import { saveSession } from "../save";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

beforeEach(async () => {
  await testDatabase.reset();
});

test("save session", async () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();

  const sessionId = uuid();

  req.session = createSession({
    user: createUser({
      name: "name",
      permission: "Read"
    }),
    sessionId,
    userAgent: "",
    expireAt: new Date()
  });
  req.secret = testProcessEnv.sessionSecret;

  await saveSession(req, res);

  const session = await getManager().findOne(SessionEntity, { sessionId }, {});

  expect(session).toBeDefined();
});
