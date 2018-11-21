import { sign } from "cookie-signature";
import { getManager } from "typeorm";
import { testProcessEnv } from "../../../__tests__/helpers";
import { TestServer } from "../../__tests__/helpers";
import { sessions, users } from "./helpers";

jest.setTimeout(10000);

const testServer = new TestServer();

beforeAll(async () => {
  await testServer.start();

  await getManager().save(Object.values(users));
  await getManager().save(Object.values(sessions));
});
afterAll(async () => {
  await testServer.stop();
});

test("GET /api/user failure", async () => {
  const { sessionId } = sessions.Guest;

  const response = await testServer.fetch("/api/user", {
    method: "GET",
    headers: {
      Cookie: `sid=${sign(sessionId, testProcessEnv.sessionSecret)}`
    }
  });

  expect(response.status).toEqual(403);
  expect(response.headers.get("content-type")).toContain("text/html");
});

test("GET /api/user success", async () => {
  const { sessionId } = sessions.Read;

  const response = await testServer.fetch("/api/user", {
    method: "GET",
    headers: {
      Cookie: `sid=${sign(sessionId, testProcessEnv.sessionSecret)}`
    }
  });

  expect(response.status).toEqual(200);
  expect(response.headers.get("content-type")).toContain("application/json");
});

test("GET /api/users success", async () => {
  const { sessionId } = sessions.Guest;

  const response = await testServer.fetch("/api/users", {
    method: "GET",
    headers: {
      Cookie: `sid=${sign(sessionId, testProcessEnv.sessionSecret)}`
    }
  });

  expect(response.status).toEqual(200);
  expect(response.headers.get("content-type")).toContain("application/json");
});
