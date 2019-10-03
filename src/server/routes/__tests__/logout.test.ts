import { strict as assert } from "assert";
import { serialize } from "cookie";
import { sign } from "cookie-signature";
import { insertSession, insertUser, request, reset, start, stop, testEnv } from "../../__tests__/helpers";

beforeAll(async () => start());
beforeEach(async () => reset());
afterAll(async () => stop());

test("GET /logout -> 200", async () => {
  const { user } = await insertUser("Write");
  const session = await insertSession(user);

  const response = await request("/logout", {
    headers: {
      Cookie: serialize("connect.sid", `s:${sign(session.sessionId, testEnv.session.secret)}`)
    }
  });

  assert.equal(response.status, 200);

  const clearSiteDataHeader = response.headers.get("Clear-Site-Data");
  assert(clearSiteDataHeader && clearSiteDataHeader === `"cache", "cookies", "storage", "executionContexts"`);
});

test("GET /logout -> 403", async () => {
  const response = await request("/logout");

  assert.equal(response.status, 403);

  const contentTypeHeader = response.headers.get("Content-Type");
  assert(contentTypeHeader && contentTypeHeader.includes("text/html"));
});
