import { connectDatabase } from "../database";
import { startServer } from "../start";
import { testProcessEnv } from "./helpers";

beforeAll(async done => {
  const database = await connectDatabase(testProcessEnv);
  await database.dropDatabase();
  await database.close();

  done();
});

test("start", async () => {
  const spyLog = jest.spyOn(console, "log");
  spyLog.mockImplementation(message => message);

  const { server, database } = await startServer(testProcessEnv);

  expect(spyLog).toBeCalled();
  expect(spyLog.mock.results[0].value).toEqual(`server: listening on port ${testProcessEnv.serverPort}`);

  spyLog.mockRestore();

  await database.close();

  return new Promise(resolve => {
    server.close(() => resolve());
  });
});
