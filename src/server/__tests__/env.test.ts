import { getProcessEnv } from "../env";

const { env } = process;

beforeEach(() => {
  process.env = { ...env };
});

afterAll(() => {
  process.env = env;
});

test("defined", () => {
  const SERVER_PORT = "5000";
  const SERVER_HOST = "localhost";

  process.env = {
    SERVER_PORT,
    SERVER_HOST
  };

  const processEnv = getProcessEnv();

  expect(processEnv.serverPort).toEqual(Number(SERVER_PORT));
  expect(processEnv.serverHost).toEqual(SERVER_HOST);
});

test("undefined", () => {
  process.env = {};

  const processEnv = getProcessEnv();

  expect(processEnv.serverPort).toEqual(undefined);
});
