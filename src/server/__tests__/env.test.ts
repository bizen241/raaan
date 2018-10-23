import { getProcessEnv } from "../env";

const { env } = process;

afterAll(() => {
  process.env = env;
});

test("filled", () => {
  process.env = {
    SERVER_PORT: "8000",
    SERVER_HOST: "localhost",
    DATABASE_URL: "porsgres://postgres@localhost/database"
  };

  const processEnv = getProcessEnv();

  expect(processEnv.serverPort).toEqual(Number(process.env.SERVER_PORT));
  expect(processEnv.serverHost).toEqual(process.env.SERVER_HOST);
});

test("only required", () => {
  process.env = {
    DATABASE_URL: "porsgres://postgres@localhost/database"
  };

  const processEnv = getProcessEnv();

  expect(processEnv.serverPort).toEqual(3000);
  expect(processEnv.serverHost).toEqual("localhost");
});

test("missing DATABASE_URL", () => {
  process.env = {};

  expect(getProcessEnv).toThrowError();
});
