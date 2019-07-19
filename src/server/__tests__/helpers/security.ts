import { OpenAPI } from "openapi-types";
import { Permission } from "../../../shared/api/entities";

export const hasSecurity = (apiDoc: OpenAPI.Operation | undefined, permission: Permission) =>
  apiDoc && apiDoc.security && apiDoc.security[0][permission];
