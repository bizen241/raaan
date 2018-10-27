import { getProcessEnv } from "../env";

const { env: oldEnv } = process;

afterAll(() => {
  process.env = oldEnv;
});

const env: NodeJS.ProcessEnv = {
  SERVER_PORT: "8000",
  SERVER_HOST: "localhost",
  SESSION_SECRET: "secret",
  DATABASE_URL: "porsgres://postgres@localhost/database"
};

test("filled", () => {
  process.env = { ...env };

  const processEnv = getProcessEnv();

  expect(processEnv.serverPort).toEqual(Number(process.env.SERVER_PORT));
  expect(processEnv.serverHost).toEqual(process.env.SERVER_HOST);
});

test("only required", () => {
  process.env = {
    SESSION_SECRET: "secret",
    DATABASE_URL: "porsgres://postgres@localhost/database"
  };

  const processEnv = getProcessEnv();

  expect(processEnv.serverPort).toEqual(3000);
  expect(processEnv.serverHost).toEqual("localhost");
});

test("missing SESSION_SECRET", () => {
  process.env = {
    ...env,
    SESSION_SECRET: undefined
  };

  expect(getProcessEnv).toThrowError();
});

test("missing DATABASE_URL", () => {
  process.env = {
    ...env,
    DATABASE_URL: undefined
  };

  expect(getProcessEnv).toThrowError();
});
