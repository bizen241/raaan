import { createRequest, createResponse } from "node-mocks-http";
import { GET } from "../user";

test("user", async () => {
  const req = createRequest();
  const res = createResponse();

  await GET(req, res, () => null);

  expect(res.statusCode).toBe(404);
});
