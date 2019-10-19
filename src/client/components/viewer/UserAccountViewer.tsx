import * as React from "react";
import { UserAccount } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { Column, Property } from "../ui";

export const UserAccountViewer = withEntity<UserAccount>({ entityType: "UserAccount" })(
  React.memo(({ entity: userAccount }) => {
    return (
      <Column>
        <Property label="プロバイダ">{userAccount.provider}</Property>
        <Property label="ID">{userAccount.accountId}</Property>
        <Property label="メールアドレス">{userAccount.email}</Property>
      </Column>
    );
  })
);
