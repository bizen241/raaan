import { EntityStore } from "../../../../shared/api/response/entity";
import { GET } from "../user";
import { createHttpMocks, users } from "./helpers";

test("GET /user", async () => {
  const { req, res } = createHttpMocks("Read");

  await GET(req, res, () => null);

  expect(res.statusCode).toBe(200);

  const data = JSON.parse(res._getData()) as EntityStore;
  expect(data.User[users.Read.id]).toBeDefined();
});
