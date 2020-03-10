import { Lock } from "@material-ui/icons";
import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { useEntity } from "../../hooks/useEntity";
import { Card, Property } from "../ui";

export const UserAccountViewer = React.memo<{
  userAccountId: EntityId<"UserAccount">;
}>(({ userAccountId }) => {
  const { entity: userAccount } = useEntity("UserAccount", userAccountId);

  return (
    <Card icon={<Lock />} title="現在のプロバイダ">
      <Property label="プロバイダ名">{userAccount.provider}</Property>
      <Property label="アカウントID">{userAccount.accountId}</Property>
      <Property label="メールアドレス">{userAccount.email}</Property>
    </Card>
  );
});
