import * as express from "express";
import { createAuthMiddleware } from "../../auth";
import { insertSessions } from "../../session/__tests__/helpers";
import { TestServer } from "./helpers";

let receivedProvider: string | undefined;

const mockFunction = (): express.RequestHandler => (req, res, next) => {
  req.authorize = provider => {
    receivedProvider = provider;
    res.sendStatus(200);
  };
  req.authenticate = provider => {
    receivedProvider = provider;
    res.sendStatus(200);
  };

  next();
};

jest.mock("../../auth");
(createAuthMiddleware as jest.Mock).mockImplementation(mockFunction);

const testServer = new TestServer();

beforeAll(async () => {
  await testServer.start();

  await insertSessions();
});
afterAll(async () => {
  await testServer.stop();
});

beforeEach(() => {
  receivedProvider = undefined;
});

test("authorize with valid provider", async () => {
  const expectedProvider = "github";

  await testServer.fetch(`/auth/${expectedProvider}`);

  expect(receivedProvider).toEqual(expectedProvider);
});

test("authorize with invalid provider", async () => {
  const expectedProvider = "ivalid provider";

  await testServer.fetch(`/auth/${expectedProvider}`);

  expect(receivedProvider).toBeUndefined();
});

test("authenticate with valid provider", async () => {
  const expectedProvider = "github";

  await testServer.fetch(`/auth/${expectedProvider}/callback`);

  expect(receivedProvider).toEqual(expectedProvider);
});

test("authenticate with invalid provider", async () => {
  const expectedProvider = "invalid provider";

  await testServer.fetch(`/auth/${expectedProvider}/callback`);

  expect(receivedProvider).toBeUndefined();
});
