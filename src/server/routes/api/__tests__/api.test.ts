import { sign } from "cookie-signature";
import { getManager } from "typeorm";
import { testProcessEnv } from "../../../__tests__/helpers";
import { TestServer } from "../../__tests__/helpers";
import { sessions, users } from "./helpers";

jest.setTimeout(10000);

const testServer = new TestServer();

beforeAll(async () => {
  console.log("beforeAll:start", performance.now());
  await testServer.start();

  await getManager().save(Object.values(users));
  await getManager().save(Object.values(sessions));
  console.log("beforeAll:end", performance.now());
});
afterAll(async () => {
  console.log("afterAll:start", performance.now());
  await testServer.stop();
  console.log("afterAll:end", performance.now());
});

test("GET /api/user failure", async () => {
  console.log("firstTest:start", performance.now());
  const { sessionId } = sessions.Guest;

  const response = await testServer.fetch("/api/user", {
    method: "GET",
    headers: {
      Cookie: `sid=${sign(sessionId, testProcessEnv.sessionSecret)}`
    }
  });

  expect(response.status).toEqual(403);
  expect(response.headers.get("content-type")).toContain("text/html");
  console.log("firstTest:end", performance.now());
});

test("GET /api/user success", async () => {
  console.log("secondTest:start", performance.now());
  const { sessionId } = sessions.Read;

  const response = await testServer.fetch("/api/user", {
    method: "GET",
    headers: {
      Cookie: `sid=${sign(sessionId, testProcessEnv.sessionSecret)}`
    }
  });

  expect(response.status).toEqual(200);
  expect(response.headers.get("content-type")).toContain("application/json");
  console.log("secondTest:end", performance.now());
});

test("GET /api/users success", async () => {
  console.log("thirdTest:start", performance.now());
  const { sessionId } = sessions.Guest;

  const response = await testServer.fetch("/api/users", {
    method: "GET",
    headers: {
      Cookie: `sid=${sign(sessionId, testProcessEnv.sessionSecret)}`
    }
  });

  expect(response.status).toEqual(200);
  expect(response.headers.get("content-type")).toContain("application/json");
  console.log("thirdTest:end", performance.now());
});
