import { OperationFunction } from "express-openapi";
import { createApiDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  responseFindResult(res, req.session.user);
});

GET.apiDoc = createApiDoc({
  summary: "Get the authenticated user",
  tag: "user",
  permission: "Guest"
});
