import { getProcessEnv } from "../env";

const { env: oldEnv } = process;

afterAll(() => {
  process.env = oldEnv;
});

const env: NodeJS.ProcessEnv = {
  DATABASE_URL: "database-url",
  GITHUB_CLIENT_ID: "github-client-id",
  GITHUB_CLIENT_SECRET: "github-client-secret",
  SERVER_HOST: "server-host",
  SERVER_PORT: "server-port",
  SESSION_SECRET: "session-secret"
};

test("filled", () => {
  process.env = { ...env };

  const processEnv = getProcessEnv();

  expect(processEnv.serverPort).toEqual(Number(process.env.SERVER_PORT));
  expect(processEnv.serverHost).toEqual(process.env.SERVER_HOST);
});

test("only required", () => {
  process.env = {
    DATABASE_URL: "database-url",
    GITHUB_CLIENT_ID: "github-client-id",
    GITHUB_CLIENT_SECRET: "github-client-secret",
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

  expect(getProcessEnv).toThrowError(/GITHUB_CLIENT_ID/);
});

test("missing SESSION_SECRET", () => {
  process.env = {
    ...env,
    SESSION_SECRET: undefined
  };

  expect(getProcessEnv).toThrowError(/GITHUB_CLIENT_SECRET/);
});
