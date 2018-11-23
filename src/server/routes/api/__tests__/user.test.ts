import { EntityStore } from "../../../../shared/api/response/entity";
import { users } from "../../../session/__tests__/helpers";
import { GET } from "../user";
import { createHttpMocks } from "./helpers";

test("GET /api/user", async () => {
  const { req, res } = createHttpMocks("Read");

  await GET(req, res, () => null);

  expect(res.statusCode).toBe(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.User[users.Read.id]).toBeDefined();
});
