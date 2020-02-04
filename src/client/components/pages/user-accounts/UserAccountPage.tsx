import { AccountCircle, Lock, Security } from "@material-ui/icons";
import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Page } from "../../project/Page";
import { Button } from "../../ui";

export const UserAccountPage = React.memo(() => {
  const currentUser = useCurrentUser();
  const isGuest = currentUser.permission === "Guest";

  if (!isGuest) {
    return (
      <Page title="アカウント">
        <Button icon={<AccountCircle />} label="プロフィールの設定" to={`/users/${currentUser.id}/edit`} />
        <Button icon={<AccountCircle />} label="アバターの設定" to={`/user/account/edit`} />
        <Button icon={<Lock />} label="プロバイダの設定" to={`/user/account/provider`} />
        <Button icon={<Security />} label="セキュリティ" to={`/user/security`} />
      </Page>
    );
  } else {
    return (
      <Page title="アカウント">
        <Button label="GitHubアカウントでログイン" href="/auth/github" />
        <Button label="Googleアカウントでログイン" href="/auth/google" />
      </Page>
    );
  }
});
