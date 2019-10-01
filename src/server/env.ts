import * as dotenv from "dotenv";
import { resolve } from "path";
import { isAuthProviderName } from "../shared/auth";

const { NODE_ENV } = process.env;

export const getEnv = () => {
  dotenv.config({
    path: NODE_ENV === "test" ? resolve(process.cwd(), ".env.test") : undefined
  });

  return {
    server: {
      host: getString("SERVER_HOST", "localhost"),
      port: getNumber("SERVER_PORT", "3000")
    },
    database: {
      host: getString("DATABASE_HOST", "localhost"),
      port: getNumber("DATABASE_PORT", "3306"),
      username: getString("DATABASE_USERNAME"),
      password: getString("DATABASE_PASSWORD"),
      name: getString("DATABASE_NAME")
    },
    session: {
      secret: getString("SESSION_SECRET", "secret")
    },
    owner: {
      provider: getProvider("OWNER_PROVIDER", "github"),
      id: getString("OWNER_ID", "12345678"),
      name: getString("OWNER_NAME", ""),
      email: getString("OWNER_EMAIL", "owner@example.com")
    },
    github: {
      clientId: getString("GITHUB_CLIENT_ID", "12345678901234567890"),
      clientSecret: getString("GITHUB_CLIENT_SECRET", "1234567890123456789012345678901234567890")
    },
    report: {
      csp: getString("REPORT_CSP", "https://example.com"),
      expectCt: getString("REPORT_EXPECT_CT", "https://example.com")
    }
  };
};

export type Env = ReturnType<typeof getEnv>;

const getString = (key: string, fallback?: string) => {
  const value = process.env[key];

  if (value === undefined) {
    if (NODE_ENV === "test" && fallback !== undefined) {
      return fallback;
    } else {
      throw new Error(`${key} is not defined`);
    }
  }

  return value;
};

const getNumber = (key: string, fallback?: string) => {
  const value = getString(key, fallback);
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    throw new Error(`${key} is not a number`);
  }

  return numberValue;
};

const getProvider = (key: string, fallback?: string) => {
  const value = getString(key, fallback);
  if (!isAuthProviderName(value)) {
    throw new Error(`${key} is invalid`);
  }

  return value;
};
