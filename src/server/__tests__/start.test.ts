import { getManager } from "typeorm";
import { connectDatabase } from "../database";
import { UserEntity } from "../database/entities";
import { startServer } from "../start";
import { testProcessEnv } from "./helpers";

beforeAll(async () => {
  const database = await connectDatabase(testProcessEnv);
  await database.dropDatabase();
  await database.close();
});

test("start", async () => {
  const spyLog = jest.spyOn(console, "log");
  spyLog.mockImplementation(message => message);

  const { server, database } = await startServer(testProcessEnv);

  expect(spyLog).toBeCalled();
  expect(spyLog.mock.results[0].value).toEqual(`server: listening on port ${testProcessEnv.serverPort}`);

  const guestUser = await getManager().findOne(UserEntity, { permission: "Guest" });
  expect(guestUser).toBeDefined();

  spyLog.mockRestore();

  await database.close();

  return new Promise(resolve => {
    server.close(() => resolve());
  });
});
