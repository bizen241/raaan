export type AuthProviderName = "github" | "twitter";

export const authProviderNames = Object.values({
  github: "github",
  twitter: "twitter"
} as { [P in AuthProviderName]: P });

export const isAuthProviderName = (target: any): target is AuthProviderName => authProviderNames.includes(target);
