import { sign } from "cookie-signature";
import { getManager } from "typeorm";
import { Permission } from "../../../../shared/api/entities";
import { testProcessEnv } from "../../../__tests__/helpers";
import { TestServer } from "../../__tests__/helpers";
import { sessions, users } from "./helpers";

const testServer = new TestServer();

const fetchAs = (permission: Permission, method: string, path: string, body?: any) => {
  const { sessionId } = sessions[permission];

  return testServer.fetch(path, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Cookie: `sid=${sign(sessionId, testProcessEnv.sessionSecret)}`
    }
  });
};

beforeAll(async () => {
  await testServer.start();

  await getManager().save(Object.values(users));
  await getManager().save(Object.values(sessions));
});
afterAll(async () => {
  await testServer.stop();
});

test("GET /api/user failure", async () => {
  const response = await fetchAs("Guest", "GET", "/api/user");

  expect(response.status).toEqual(403);
  expect(response.headers.get("content-type")).toContain("text/html");
});

test("GET /api/user success", async () => {
  const response = await fetchAs("Read", "GET", "/api/user");

  expect(response.status).toEqual(200);
  expect(response.headers.get("content-type")).toContain("application/json");
});

test("GET /api/users success", async () => {
  const response = await fetchAs("Guest", "GET", "/api/users");

  expect(response.status).toEqual(200);
  expect(response.headers.get("content-type")).toContain("application/json");
});
