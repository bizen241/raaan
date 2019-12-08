import { AccountCircle, Lock } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserContext } from "../../project/Context";
import { Button, Page } from "../../ui";

export const AccountPage = React.memo(() => {
  const currentUser = useContext(UserContext);
  const isGuest = currentUser.permission === "Guest";

  if (!isGuest) {
    return (
      <Page title="アカウント">
        <Button icon={<AccountCircle />} label="プロフィールの設定" to={`/users/${currentUser.id}/edit`} />
        <Button icon={<AccountCircle />} label="アバターの設定" to={`/user/user-account/edit`} />
        <Button icon={<Lock />} label="プロバイダの設定" to={`/user/user-account`} />
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
