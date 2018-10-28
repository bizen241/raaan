import { getProcessEnv } from "../env";

const { env: oldEnv } = process;

afterAll(() => {
  process.env = oldEnv;
});

const env: NodeJS.ProcessEnv = {
  DATABASE_URL: "postgres://postgres:postgres@localhost/db_name",
  GITHUB_CLIENT_ID: "12345678901234567890",
  GITHUB_CLIENT_SECRET: "1234567890123456789012345678901234567890",
  SERVER_HOST: "localhost",
  SERVER_PORT: "3000",
  SESSION_SECRET: "secret"
};

test("filled", () => {
  process.env = { ...env };

  const processEnv = getProcessEnv();

  expect(processEnv.serverPort).toEqual(Number(process.env.SERVER_PORT));
  expect(processEnv.serverHost).toEqual(process.env.SERVER_HOST);
});

test("only required", () => {
  process.env = {
    DATABASE_URL: "postgres://postgres:postgres@localhost/db_name",
    GITHUB_CLIENT_ID: "12345678901234567890",
    GITHUB_CLIENT_SECRET: "1234567890123456789012345678901234567890",
    SESSION_SECRET: "secret"
  };

  const processEnv = getProcessEnv();

  expect(processEnv.serverPort).toEqual(3000);
  expect(processEnv.serverHost).toEqual("localhost");
});

test("missing DATABASE_URL", () => {
  process.env = {
    ...env,
    DATABASE_URL: undefined
  };

  expect(getProcessEnv).toThrowError(/DATABASE_URL/);
});

test("missing GITHUB_CLIENT_ID", () => {
  process.env = {
    ...env,
    GITHUB_CLIENT_ID: undefined
  };

  expect(getProcessEnv).toThrowError(/GITHUB_CLIENT_ID/);
});

test("missing GITHUB_CLIENT_SECRET", () => {
  process.env = {
    ...env,
    GITHUB_CLIENT_SECRET: undefined
  };

  expect(getProcessEnv).toThrowError(/GITHUB_CLIENT_SECRET/);
});

test("missing SESSION_SECRET", () => {
  process.env = {
    ...env,
    SESSION_SECRET: undefined
  };

  expect(getProcessEnv).toThrowError(/SESSION_SECRET/);
});
