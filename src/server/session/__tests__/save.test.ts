import * as httpMocks from "node-mocks-http";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { testProcessEnv } from "../../__tests__/helpers";
import { TestDatabase } from "../../database/__tests__/helpers";
import { UserSessionEntity } from "../../database/entities";
import { saveSession } from "../save";
import { users } from "./helpers";

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

  const session = new UserSessionEntity(users.Guest);
  session.sessionId = sessionId;
  session.userAgent = "";
  session.expireAt = new Date();

  req.session = session;
  req.user = users.Guest;
  req.secret = testProcessEnv.sessionSecret;

  await saveSession(req, res);

  const foundSession = await getManager().findOne(UserSessionEntity, { sessionId }, {});

  expect(foundSession).toBeDefined();
});
