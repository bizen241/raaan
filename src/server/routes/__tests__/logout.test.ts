import { serialize } from "cookie";
import { sign } from "cookie-signature";
import { testProcessEnv } from "../../__tests__/helpers";
import { insertSessions, insertUsers, sessions } from "../../session/__tests__/helpers";
import { TestServer } from "./helpers";

const testServer = new TestServer();

beforeAll(async () => {
  await testServer.start();

  await insertUsers();
  await insertSessions();
});
afterAll(async () => {
  await testServer.stop();
});

test("GET /logout success", async () => {
  const response = await testServer.fetch("/logout", {
    headers: {
      Cookie: serialize("sid", sign(sessions.Write.sessionId, testProcessEnv.sessionSecret))
    }
  });

  expect(response.status).toEqual(200);
  expect(response.headers.get("Content-Type")).toContain("text/plain");
  expect(response.headers.get("Clear-Site-Data")).toBe(`"cache", "cookies", "storage", "executionContexts"`);
});

test("GET /logout failure", async () => {
  const response = await testServer.fetch("/logout");

  expect(response.status).toEqual(403);
  expect(response.headers.get("Content-Type")).toContain("text/html");
});
