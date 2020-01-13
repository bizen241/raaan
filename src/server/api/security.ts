import createError from "http-errors";
import { SecurityHandler } from "openapi-security-handler";
import { OpenAPIV3 } from "openapi-types";
import { Permission } from "../../shared/api/entities";
import { UserEntity } from "../database/entities";

const securityScheme: OpenAPIV3.ApiKeySecurityScheme = {
  type: "apiKey",
  name: "sid",
  in: "cookie"
};

export const securitySchemes: { [P in Permission]: OpenAPIV3.SecuritySchemeObject } = {
  Owner: securityScheme,
  Admin: securityScheme,
  Write: securityScheme,
  Read: securityScheme,
  Guest: securityScheme
};

const Owner: Permission[] = ["Owner"];
const Admin: Permission[] = ["Admin", ...Owner];
const Write: Permission[] = ["Write", ...Admin];
const Read: Permission[] = ["Read", ...Write];
const Guest: Permission[] = ["Guest", ...Read];

const permissionMap: { [P in Permission]: Permission[] } = {
  Owner,
  Admin,
  Write,
  Read,
  Guest
};

export const hasPermission = (user: UserEntity | undefined, permission: Permission) => {
  if (user === undefined) {
    return permission === "Guest";
  }

  return permissionMap[permission].includes(user.permission);
};

const createSecurityHandler = (permission: Permission): SecurityHandler => req => {
  if (hasPermission(req.user, permission)) {
    return true;
  } else {
    throw createError(403);
  }
};

export const securityHandlers: { [P in Permission]: SecurityHandler } = {
  Owner: createSecurityHandler("Owner"),
  Admin: createSecurityHandler("Admin"),
  Write: createSecurityHandler("Write"),
  Read: createSecurityHandler("Read"),
  Guest: createSecurityHandler("Guest")
};
