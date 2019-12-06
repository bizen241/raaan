import { Lock } from "@material-ui/icons";
import * as React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { Card, Property } from "../ui";

export const UserAccountViewer = withEntity("UserAccount")(
  React.memo(({ entity: userAccount }) => {
    return (
      <Card icon={<Lock />} title="現在のプロバイダ">
        <Property label="プロバイダ名">{userAccount.provider}</Property>
        <Property label="アカウントID">{userAccount.accountId}</Property>
        <Property label="メールアドレス">{userAccount.email}</Property>
      </Card>
    );
  })
);
