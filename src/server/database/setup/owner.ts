import { getManager } from "typeorm";
import { Env } from "../../env";
import { UserAccountEntity, UserConfigEntity, UserEntity, UserSummaryEntity } from "../entities";

export const setOwnerUser = async (env: Env) => {
  const manager = getManager();

  const result = await manager.findOne(UserEntity, { permission: "Owner" });

  if (result === undefined) {
    const { provider, id, email, name } = env.owner;

    const ownerUserAccount = new UserAccountEntity(provider, id, email);
    const ownerUserConfig = new UserConfigEntity();
    const ownerUserSummary = new UserSummaryEntity();
    const ownerUser = new UserEntity(ownerUserAccount, ownerUserConfig, ownerUserSummary, name, "Owner");

    await manager.save(ownerUser);
  }
};
