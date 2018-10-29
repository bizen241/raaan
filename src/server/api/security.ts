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
  Read: securityScheme,
  Guest: securityScheme,
  Ghost: securityScheme
};
