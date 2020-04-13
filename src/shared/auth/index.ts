export type AuthProviderName = "github" | "google";

export const authProviderNames = Object.values({
  github: "github",
  google: "google",
} as { [P in AuthProviderName]: P });

export const isAuthProviderName = (target: any): target is AuthProviderName => authProviderNames.includes(target);
