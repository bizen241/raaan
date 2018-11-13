import { createRequest, createResponse } from "node-mocks-http";
import * as uuid from "uuid";
import { createSession, createUser } from "../../../database/entities";
import { GET } from "../user";

test("user", async () => {
  const req = createRequest();
  const res = createResponse();

  req.session = createSession({
    user: createUser({
      id: uuid(),
      name: "Guest",
      permission: "Guest"
    }),
    sessionId: uuid(),
    expireAt: new Date(),
    userAgent: "user-agent"
  });

  req.session.user.createdAt = new Date();
  req.session.user.updatedAt = new Date();

  await GET(req, res, () => null);

  expect(res.statusCode).toBe(200);
});
