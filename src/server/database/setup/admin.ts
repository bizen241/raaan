import { getManager } from "typeorm";
import { AuthProviderName } from "../../../shared/auth";
import { ProcessEnv } from "../../env";
import { createUser, createUserAccount, UserAccountEntity, UserEntity } from "../entities";

export const setAdminUser = async (env: ProcessEnv) => {
  const manager = getManager();

  const result = await manager.findOne(UserEntity, { permission: "Admin" });

  if (result === undefined) {
    const { adminAccountName } = env;

    const adminUser = createUser({
      name: adminAccountName,
      permission: "Admin"
    });

    await manager.save(adminUser);
  }

  await setAdminAccount(env);
};

const setAdminAccount = async (env: ProcessEnv) => {
  const manager = getManager();

  const adminUser = await manager.findOne(UserEntity, { permission: "Admin" });
  if (adminUser === undefined) {
    throw new Error("Admin user does not exist");
  }

  const result = await manager.findOne(UserAccountEntity, { user: { id: adminUser.id } });

  if (result === undefined) {
    const { adminAccountProvider, adminAccountId } = env;

    const adminAccount = createUserAccount({
      provider: adminAccountProvider as AuthProviderName,
      accountId: adminAccountId,
      user: adminUser
    });

    await manager.save(adminAccount);
  }
};
