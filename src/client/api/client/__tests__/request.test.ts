import { request } from "../request";

const fetchMock = jest
  .fn()
  .mockImplementationOnce(async () => {
    throw new Error();
  })
  .mockImplementationOnce(async () => ({
    ok: false
  }))
  .mockImplementationOnce(async () => ({
    ok: true,
    json: async () => {
      throw new Error();
    }
  }));

global.fetch = fetchMock;

test("request", async () => {
  expect(request("GET", "/")).rejects.toThrowError();
  expect(request("GET", "/")).rejects.toThrowError();
  expect(request("GET", "/")).rejects.toThrowError();
});
