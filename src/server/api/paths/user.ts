import { OperationFunction } from "express-openapi";
import { createApiDoc } from "../operation";

export const GET: OperationFunction = async (_, res) => {
  res.sendStatus(404);
};

GET.apiDoc = createApiDoc({
  summary: "Get the authenticated user",
  tag: "user",
  permission: "Read"
});
