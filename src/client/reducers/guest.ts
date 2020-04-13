import { User, UserAccount, UserConfig } from "../../shared/api/entities";
import { getCacheId } from "../components/__stories__/helpers/Entities";

export const guestUser: User = {
  id: getCacheId(0),
  name: "",
  permission: "Guest",
  summaryId: getCacheId(0),
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0,
};
export const guestUserAccount: UserAccount = {
  id: getCacheId(0),
  provider: "github",
  accountId: "",
  email: "guest@example.com",
  avatar: "identicon",
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0,
};
export const guestUserConfig: UserConfig = {
  id: getCacheId(0),
  settings: {},
  createdAt: 0,
  updatedAt: 0,
  fetchedAt: 0,
};
