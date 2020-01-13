import * as dotenv from "dotenv";
import getenv from "getenv";
import { resolve } from "path";
import { isAuthProviderName } from "../shared/auth";

const { NODE_ENV } = process.env;

export const getEnv = () => {
  dotenv.config({
    path: NODE_ENV === "test" ? resolve(process.cwd(), ".env.test") : undefined
  });

  if (NODE_ENV !== "test") {
    getenv.disableFallbacks();
  }

  return {
    server: {
      host: getenv("SERVER_HOST", "localhost"),
      port: getenv.int("SERVER_PORT", 3000)
    },
    database: {
      host: getenv("DATABASE_HOST", "127.0.0.1"),
      port: getenv.int("DATABASE_PORT", 3306),
      username: getenv("DATABASE_USERNAME"),
      password: getenv("DATABASE_PASSWORD"),
      name: getenv("DATABASE_NAME")
    },
    session: {
      secret: getenv("SESSION_SECRET", "secret")
    },
    owner: {
      provider: getProvider("OWNER_PROVIDER", "github"),
      id: getenv("OWNER_ID", "owner_id"),
      name: getenv("OWNER_NAME", "owner_name"),
      email: getenv("OWNER_EMAIL", "owner@example.com")
    },
    github: {
      clientId: getenv("GITHUB_CLIENT_ID", "github_client_id"),
      clientSecret: getenv("GITHUB_CLIENT_SECRET", "github_client_secret")
    },
    google: {
      clientId: getenv("GOOGLE_CLIENT_ID", "google_client_id"),
      clientSecret: getenv("GOOGLE_CLIENT_SECRET", "google_client_secret")
    },
    report: {
      csp: getenv("REPORT_CSP", "https://example.com"),
      expectCt: getenv("REPORT_EXPECT_CT", "https://example.com")
    }
  };
};

export type Env = ReturnType<typeof getEnv>;

const getProvider = (key: string, fallback?: string) => {
  const value = getenv(key, fallback);
  if (!isAuthProviderName(value)) {
    throw new Error(`${key} is invalid`);
  }

  return value;
};
