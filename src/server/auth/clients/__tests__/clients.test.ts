import fetch from "node-fetch";
import { createRequest } from "node-mocks-http";
import { createAuthClients } from "..";
import { testProcessEnv } from "../../../__tests__/helpers";
import { createSession } from "../../../database/entities";
import { guestUser } from "../../../database/setup/guest";

const sessionId = "9cc8d99f-c7e0-4f97-96c9-ae3e4d431b3e";
const state = "9cc8d99f-c7e0-4f97-96c9-ae3e4d431b3e.cnNHbxcZzIEU2KwGFv3iBPho7j3WbSqJvmLkrSRslGU";
const code = "1234567890";
const accessToken = "1234567890123456789012345678901234567890";
const session = createSession({
  user: guestUser,
  sessionId,
  expireAt: new Date(),
  userAgent: "user-agent"
});
const secret = testProcessEnv.sessionSecret;

jest.mock("node-fetch");
(fetch as jest.Mock)
  // for third test
  .mockReturnValueOnce({
    ok: false
  })
  // for fourth test
  .mockReturnValueOnce({
    ok: true,
    json: () => ({})
  })
  // for fifth test
  .mockReturnValueOnce({
    ok: true,
    json: () => ({
      access_token: accessToken
    })
  })
  .mockReturnValueOnce({
    ok: false
  })
  // for sixth test
  .mockReturnValueOnce({
    ok: true,
    json: () => ({
      access_token: accessToken
    })
  })
  .mockReturnValueOnce({
    ok: true,
    json: () => ({})
  })
  // for seventh test
  .mockReturnValueOnce({
    ok: true,
    json: () => ({
      access_token: accessToken
    })
  })
  .mockReturnValueOnce({
    ok: true,
    json: () => ({
      id: "12345678"
    })
  });

test("1. authorization request error", async () => {
  const clients = createAuthClients(testProcessEnv);
  const req = createRequest();
  req.query = {
    error: "application_suspended"
  };

  expect(clients.github.authenticate(req)).rejects.toThrow();
});

test("2. failed to unsign session id", async () => {
  const clients = createAuthClients(testProcessEnv);
  const req = createRequest();
  req.session = session;
  req.secret = secret;
  req.query = {
    state: "invalid state"
  };

  expect(clients.github.authenticate(req)).rejects.toThrow();
});

test("3. response is not ok", async () => {
  const clients = createAuthClients(testProcessEnv);
  const req = createRequest();
  req.session = session;
  req.secret = secret;
  req.query = {
    state,
    code
  };

  expect(clients.github.authenticate(req)).rejects.toThrow();
});

test("4. access_token is not string", async () => {
  const clients = createAuthClients(testProcessEnv);
  const req = createRequest();
  req.session = session;
  req.secret = secret;
  req.query = {
    state,
    code
  };

  expect(clients.github.authenticate(req)).rejects.toThrow();
});

test("5. response is not ok", async () => {
  const clients = createAuthClients(testProcessEnv);
  const req = createRequest();
  req.session = session;
  req.secret = secret;
  req.query = {
    state,
    code
  };

  expect(clients.github.authenticate(req)).rejects.toThrow();
});

test("6. id is not number", async () => {
  const clients = createAuthClients(testProcessEnv);
  const req = createRequest();
  req.session = session;
  req.secret = secret;
  req.query = {
    state,
    code
  };

  expect(clients.github.authenticate(req)).rejects.toThrow();
});

test("7. login is not string", async () => {
  const clients = createAuthClients(testProcessEnv);
  const req = createRequest();
  req.session = session;
  req.secret = secret;
  req.query = {
    state,
    code
  };

  expect(clients.github.authenticate(req)).rejects.toThrow();
});
