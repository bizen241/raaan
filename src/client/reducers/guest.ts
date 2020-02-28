import { User, UserAccount, UserConfig } from "../../shared/api/entities";
import { generateLocalEntityId } from "./entity";

export const guestUser: User = {
  id: generateLocalEntityId<"User">(),
  name: "",
  permission: "Guest",
  summaryId: generateLocalEntityId<"UserSummary">(),
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0
};
export const guestUserAccount: UserAccount = {
  id: generateLocalEntityId<"UserAccount">(),
  provider: "github",
  accountId: "",
  email: "guest@example.com",
  avatar: "identicon",
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0
};
export const guestUserConfig: UserConfig = {
  id: generateLocalEntityId<"UserConfig">(),
  settings: {},
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0
};
