import { getManager } from "typeorm";
import { ProcessEnv } from "../../env";
import { UserAccountEntity, UserConfigEntity, UserEntity } from "../entities";

export const setAdminUser = async (env: ProcessEnv) => {
  const manager = getManager();

  const result = await manager.findOne(UserEntity, { permission: "Admin" });

  if (result === undefined) {
    const { adminAccountProvider, adminAccountId, adminAccountName, adminAccountEmail } = env;

    const adminUser = new UserEntity(adminAccountName, "Admin");
    await manager.save(adminUser);

    const adminUserAccount = new UserAccountEntity(adminUser, adminAccountProvider, adminAccountId, adminAccountEmail);
    await manager.save(adminUserAccount);

    const adminUserConfig = new UserConfigEntity(adminUser);
    await manager.save(adminUserConfig);
  }
};
