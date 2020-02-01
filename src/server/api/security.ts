import createError from "http-errors";
import { SecurityHandler } from "openapi-security-handler";
import { OpenAPIV3 } from "openapi-types";
import { Permission } from "../../shared/api/entities";
import { hasPermission } from "../../shared/api/security";

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
