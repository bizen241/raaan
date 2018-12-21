import * as uuid from "uuid";
import { createEntity, deleteEntity, getCurrentUser, getEntity, searchEntity, updateEntity } from "..";

let passedUrl: string;
let passedMethod: string | undefined;

const fetchMock = jest.fn(async (url: string, init: RequestInit) => {
  passedUrl = url;
  passedMethod = init.method;

  return {
    ok: true,
    json: async () => ({})
  };
});

global.fetch = fetchMock;

const origin = location.origin;

test("get current user", async () => {
  await getCurrentUser();

  expect(passedUrl).toBe(`${origin}/api/user`);
  expect(passedMethod).toBe("GET");
});

const userId = uuid();

test("get user", async () => {
  await getEntity("User", userId);

  expect(passedUrl).toBe(`${origin}/api/users/${userId}`);
  expect(passedMethod).toBe("GET");
});

test("create user", async () => {
  await createEntity("User", {});

  expect(passedUrl).toBe(`${origin}/api/users`);
  expect(passedMethod).toBe("POST");
});

test("update user", async () => {
  await updateEntity("User", userId, {});

  expect(passedUrl).toBe(`${origin}/api/users/${userId}`);
  expect(passedMethod).toBe("PATCH");
});

test("delete user", async () => {
  await deleteEntity("User", userId);

  expect(passedUrl).toBe(`${origin}/api/users/${userId}`);
  expect(passedMethod).toBe("DELETE");
});

test("search user", async () => {
  await searchEntity("User", {
    page: 1
  });

  expect(passedUrl).toBe(`${origin}/api/users?page=1`);
  expect(passedMethod).toBe("GET");
});
