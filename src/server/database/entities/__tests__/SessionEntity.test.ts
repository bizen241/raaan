import { getManager } from "typeorm";
import * as uuid from "uuid";
import { TestDatabase } from "../../__tests__/helpers";
import { createSession, SessionEntity } from "../SessionEntity";
import { createUser } from "../UserEntity";

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

test("sessions", async () => {
  const sessionRepository = getManager().getRepository(SessionEntity);
  const session = createSession({
    user: createUser({
      name: "name",
      permission: "Read"
    }),
    sessionId: uuid(),
    userAgent: "userAgent",
    expireAt: new Date()
  });
  await sessionRepository.save(session);

  const sessions = await sessionRepository.find();

  expect(sessions.length).toBe(1);
});
