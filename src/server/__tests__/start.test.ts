import { start } from "../start";
import { testProcessEnv } from "./helpers";

const spyLog = jest.spyOn(console, "log");
spyLog.mockImplementation(message => message);

test("start", async () => {
  const server = await start(testProcessEnv);

  expect(console.log).toBeCalled();
  expect(spyLog.mock.results[0].value).toEqual(`server: listening on port ${testProcessEnv.serverPort}`);

  spyLog.mockReset();
  spyLog.mockRestore();

  return new Promise(resolve => {
    server.close(() => resolve());
  });
});
