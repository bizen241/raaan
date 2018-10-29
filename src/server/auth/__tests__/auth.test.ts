import fetch from "node-fetch";
import { createRequest, createResponse } from "node-mocks-http";
import { createAuthMiddleware } from "..";
import { testProcessEnv } from "../../__tests__/helpers";
import { TestDatabase } from "../../database/__tests__/helpers";
import { createSession } from "../../database/entities";
import { getGuestUser } from "../../database/setup/guest";
import { authTestHelpers } from "./helpers";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

beforeEach(async () => {
  await testDatabase.reset();
});

let tokenUrl: string;
let userProfileUrl: string;

const { accessToken, code, secret, sessionId, state } = authTestHelpers;

test("authorize with github", async () => {
  const req = createRequest();
  const res = createResponse();

  const guestUser = await getGuestUser();

  req.session = createSession({
    user: guestUser,
    sessionId,
    expireAt: new Date(),
    userAgent: "user-agent"
  });
  req.secret = secret;

  const spyRedirect = jest.spyOn(res, "redirect");
  spyRedirect.mockImplementation(path => path);

  const authMiddleware = createAuthMiddleware(testProcessEnv);
  authMiddleware(req, res, () => null);

  await req.authorize("github");

  expect(spyRedirect).toBeCalled();
  expect(spyRedirect.mock.results[0].value).toEqual(
    `https://github.com/login/oauth/authorize?client_id=${testProcessEnv.githubClientId}&state=${state}`
  );
});

jest.mock("node-fetch");
(fetch as jest.Mock)
  .mockImplementationOnce((url: string) => {
    tokenUrl = url;

    return {
      ok: true,
      json: () => ({
        access_token: accessToken
      })
    };
  })
  .mockImplementationOnce((url: string) => {
    userProfileUrl = url;

    return {
      ok: true,
      json: () => ({
        id: 12345678,
        login: "username"
      })
    };
  });

test("authenticate with github", async () => {
  const req = createRequest();
  const res = createResponse();

  const guestUser = await getGuestUser();

  req.session = createSession({
    user: guestUser,
    sessionId,
    expireAt: new Date(),
    userAgent: "user-agent"
  });
  req.secret = secret;
  req.query = {
    state,
    code
  };

  const spyRedirect = jest.spyOn(res, "redirect");
  spyRedirect.mockImplementation(path => path);

  const authMiddleware = createAuthMiddleware(testProcessEnv);
  authMiddleware(req, res, () => null);

  await req.authenticate("github");

  expect(tokenUrl).toBe(
    `https://github.com/login/oauth/access_token?client_id=${testProcessEnv.githubClientId}&client_secret=${
      testProcessEnv.githubClientSecret
    }&code=${code}`
  );
  expect(userProfileUrl).toBe(`https://api.github.com/user?access_token=${accessToken}`);

  expect(spyRedirect).toBeCalled();
  expect(spyRedirect.mock.results[0].value).toEqual("/");

  expect(req.session.user.permission === "Read");
});
