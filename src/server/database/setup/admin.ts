import { getManager } from "typeorm";
import { ProcessEnv } from "../../env";
import { UserAccountEntity, UserConfigEntity, UserEntity } from "../entities";

export const setAdminUser = async (env: ProcessEnv) => {
  const manager = getManager();

  const result = await manager.findOne(UserEntity, { permission: "Admin" });

  if (result === undefined) {
    const { adminAccountProvider, adminAccountId, adminAccountName, adminAccountEmail } = env;

    const adminUserAccount = new UserAccountEntity(adminAccountProvider, adminAccountId, adminAccountEmail);
    const adminUserConfig = new UserConfigEntity();
    const adminUser = new UserEntity(adminUserAccount, adminUserConfig, adminAccountName, "Admin");

    await manager.save(adminUser);
  }
};
