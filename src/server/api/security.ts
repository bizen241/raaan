import * as createError from "http-errors";
import { SecurityHandler } from "openapi-security-handler";
import { OpenAPIV2 } from "openapi-types";
import { Permission } from "../../shared/api/entities";

const securityScheme: OpenAPIV2.SecuritySchemeApiKey = {
  type: "apiKey",
  name: "cookie",
  in: "header"
};

export const securityDefinitions: { [P in Permission]: OpenAPIV2.SecuritySchemeApiKey } = {
  Owner: securityScheme,
  Admin: securityScheme,
  Write: securityScheme,
  Guest: securityScheme,
  Ghost: securityScheme
};

const Owner: Permission[] = ["Owner"];
const Admin: Permission[] = ["Admin", ...Owner];
const Write: Permission[] = ["Write", ...Admin];
const Guest: Permission[] = ["Guest", ...Write];
const Ghost: Permission[] = ["Ghost", ...Guest];

const permissionMap: { [P in Permission]: Permission[] } = {
  Owner,
  Admin,
  Write,
  Guest,
  Ghost
};

const createSecurityHandler = (permission: Permission): SecurityHandler => req => {
  const hasPermission = permissionMap[permission].includes(req.session.user.permission);

  if (hasPermission) {
    return true;
  } else {
    throw createError(403);
  }
};

export const securityHandlers: { [P in Permission]: SecurityHandler } = {
  Owner: createSecurityHandler("Owner"),
  Admin: createSecurityHandler("Admin"),
  Write: createSecurityHandler("Write"),
  Guest: createSecurityHandler("Guest"),
  Ghost: createSecurityHandler("Ghost")
};
