import * as createError from "http-errors";
import { SecurityHandler } from "openapi-security-handler";
import { OpenAPIV3 } from "openapi-types";
import { Permission } from "../../shared/api/entities";

const securityScheme: OpenAPIV3.ApiKeySecurityScheme = {
  type: "apiKey",
  name: "sid",
  in: "cookie"
};

export const securitySchemes: { [P in Permission]: OpenAPIV3.SecuritySchemeObject } = {
  Owner: securityScheme,
  Admin: securityScheme,
  Write: securityScheme,
  Guest: securityScheme
};

const Owner: Permission[] = ["Owner"];
const Admin: Permission[] = ["Admin", ...Owner];
const Write: Permission[] = ["Write", ...Admin];
const Guest: Permission[] = ["Guest", ...Write];

const permissionMap: { [P in Permission]: Permission[] } = {
  Owner,
  Admin,
  Write,
  Guest
};

const createSecurityHandler = (permission: Permission): SecurityHandler => req => {
  const hasPermission =
    req.user !== undefined ? permissionMap[permission].includes(req.user.permission) : permission === "Guest";

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
  Guest: createSecurityHandler("Guest")
};
