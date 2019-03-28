import { getManager } from "typeorm";
import { ProcessEnv } from "../../env";
import { UserAccountEntity, UserConfigEntity, UserEntity } from "../entities";

export const setAdminUser = async (env: ProcessEnv) => {
  const manager = getManager();

  const result = await manager.findOne(UserEntity, { permission: "Admin" });

  if (result === undefined) {
    const { adminAccountProvider, adminAccountId, adminAccountName } = env;

    const adminUserAccount = new UserAccountEntity(adminAccountProvider, adminAccountId, "");
    await manager.save(adminUserAccount);

    const adminUserConfig = new UserConfigEntity();
    await manager.save(adminUserConfig);

    const adminUser = new UserEntity(adminAccountName, "Admin", adminUserAccount, adminUserConfig);
    await manager.save(adminUser);
  }
};
