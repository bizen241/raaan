import { OperationFunction } from "express-openapi";
import { createApiDoc } from "../../api/operation";
import { responseFindResult } from "../../api/response";

export const GET: OperationFunction = async (req, res) => {
  responseFindResult(res, req.session.user);
};

GET.apiDoc = createApiDoc({
  summary: "Get the authenticated user",
  tag: "user",
  permission: "Guest"
});
