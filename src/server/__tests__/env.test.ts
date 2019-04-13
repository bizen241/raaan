import { getProcessEnv } from "../env";

const { env: oldEnv } = process;

afterAll(() => {
  process.env = oldEnv;
});

const env: NodeJS.ProcessEnv = {
  HOST: "localhost",
  PORT: "3000",
  DATABASE_URL: "postgres://postgres:postgres@localhost/db_name",
  SESSION_SECRET: "secret",
  ADMIN_ACCOUNT_PROVIDER: "github",
  ADMIN_ACCOUNT_ID: "12345678",
  ADMIN_ACCOUNT_NAME: "name",
  ADMIN_ACCOUNT_EMAIL: "example@example.com",
  GITHUB_CLIENT_ID: "12345678901234567890",
  GITHUB_CLIENT_SECRET: "1234567890123456789012345678901234567890"
};

test("filled", () => {
  process.env = { ...env };

  const processEnv = getProcessEnv();

  expect(processEnv.serverPort).toEqual(Number(process.env.PORT));
  expect(processEnv.serverHost).toEqual(process.env.HOST);
});

test("only required", () => {
  process.env = {
    HOST: "localhost",
    PORT: "3000",
    DATABASE_URL: "postgres://postgres:postgres@localhost/db_name",
    SESSION_SECRET: "secret",
    ADMIN_ACCOUNT_PROVIDER: "github",
    ADMIN_ACCOUNT_ID: "12345678",
    ADMIN_ACCOUNT_NAME: "name",
    ADMIN_ACCOUNT_EMAIL: "example@example.com",
    GITHUB_CLIENT_ID: "12345678901234567890",
    GITHUB_CLIENT_SECRET: "1234567890123456789012345678901234567890"
  };

  const processEnv = getProcessEnv();

  expect(processEnv.serverPort).toEqual(3000);
  expect(processEnv.serverHost).toEqual("localhost");
});

test("missing HOST", () => {
  process.env = {
    ...env,
    HOST: undefined
  };

  expect(getProcessEnv).toThrowError(/HOST/);
});

test("missing PORT", () => {
  process.env = {
    ...env,
    PORT: undefined
  };

  expect(getProcessEnv).toThrowError(/PORT/);
});

test("missing DATABASE_URL", () => {
  process.env = {
    ...env,
    DATABASE_URL: undefined
  };

  expect(getProcessEnv).toThrowError(/DATABASE_URL/);
});

test("missing SESSION_SECRET", () => {
  process.env = {
    ...env,
    SESSION_SECRET: undefined
  };

  expect(getProcessEnv).toThrowError(/SESSION_SECRET/);
});

test("missing ADMIN_ACCOUNT_PROVIDER", () => {
  process.env = {
    ...env,
    ADMIN_ACCOUNT_PROVIDER: undefined
  };

  expect(getProcessEnv).toThrowError(/ADMIN_ACCOUNT_PROVIDER/);
});

test("missing ADMIN_ACCOUNT_ID", () => {
  process.env = {
    ...env,
    ADMIN_ACCOUNT_ID: undefined
  };

  expect(getProcessEnv).toThrowError(/ADMIN_ACCOUNT_ID/);
});

test("missing ADMIN_ACCOUNT_NAME", () => {
  process.env = {
    ...env,
    ADMIN_ACCOUNT_NAME: undefined
  };

  expect(getProcessEnv).toThrowError(/ADMIN_ACCOUNT_NAME/);
});

test("missing ADMIN_ACCOUNT_EMAIL", () => {
  process.env = {
    ...env,
    ADMIN_ACCOUNT_EMAIL: undefined
  };

  expect(getProcessEnv).toThrowError(/ADMIN_ACCOUNT_EMAIL/);
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
