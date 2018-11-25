import { OperationFunction } from "express-openapi";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  responseFindResult(res, req.session.user);
});

GET.apiDoc = createOperationDoc({
  summary: "Get the authenticated user",
  tag: "user",
  permission: "Guest"
});
