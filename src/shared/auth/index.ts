export type AuthProviderName = "github";

const authProviderNames = Object.values({
  github: "github"
} as { [P in AuthProviderName]: P });

export const isAuthProviderName = (target: any): target is AuthProviderName => authProviderNames.includes(target);
