import { serialize } from "cookie";
import { sign } from "cookie-signature";
import { insertSession, insertUser, testProcessEnv, TestServer } from "../../__tests__/helpers";

const testServer = new TestServer();

beforeAll(async () => {
  await testServer.start();
});
afterAll(async () => {
  await testServer.stop();
});

test("GET /logout success", async () => {
  const { user } = await insertUser("Write");
  const session = await insertSession(user);

  const response = await testServer.fetch("/logout", {
    headers: {
      Cookie: serialize("connect.sid", `s:${sign(session.sessionId, testProcessEnv.sessionSecret)}`)
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
