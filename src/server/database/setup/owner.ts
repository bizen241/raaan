import { getManager } from "typeorm";
import { ProcessEnv } from "../../env";
import { UserAccountEntity, UserConfigEntity, UserEntity, UserSummaryEntity } from "../entities";

export const setOwnerUser = async (env: ProcessEnv) => {
  const manager = getManager();

  const result = await manager.findOne(UserEntity, { permission: "Owner" });

  if (result === undefined) {
    const { ownerAccountProvider, ownerAccountId, ownerAccountName, ownerAccountEmail } = env;

    const ownerUserAccount = new UserAccountEntity(ownerAccountProvider, ownerAccountId, ownerAccountEmail);
    const ownerUserConfig = new UserConfigEntity();
    const ownerUserSummary = new UserSummaryEntity();
    const ownerUser = new UserEntity(ownerUserAccount, ownerUserConfig, ownerUserSummary, ownerAccountName, "Owner");

    await manager.save(ownerUser);
  }
};
