import { startServer } from "../start";
import { testProcessEnv } from "./helpers";

test("start", async () => {
  const spyLog = jest.spyOn(console, "log");
  spyLog.mockImplementation(message => message);

  const server = await startServer(testProcessEnv);

  expect(spyLog).toBeCalled();
  expect(spyLog.mock.results[0].value).toEqual(`server: listening on port ${testProcessEnv.serverPort}`);

  spyLog.mockRestore();

  return new Promise(resolve => {
    server.close(() => resolve());
  });
});
