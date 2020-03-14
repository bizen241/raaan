import { AccountCircle, Lock, Security } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Button } from "../../ui";

export const UserAccountPage = createPage()(
  React.memo(({ t }) => t("アカウント")),
  React.memo(() => {
    const { currentUser } = useCurrentUser();
    const isGuest = currentUser.permission === "Guest";

    if (!isGuest) {
      return (
        <>
          <Button icon={<AccountCircle />} label="プロフィールの設定" to={`/users/${currentUser.id}/edit`} />
          <Button icon={<AccountCircle />} label="アバターの設定" to={`/user/account/edit`} />
          <Button icon={<Lock />} label="プロバイダの設定" to={`/user/account/provider`} />
          <Button icon={<Security />} label="セキュリティ" to={`/user/security`} />
        </>
      );
    } else {
      return (
        <>
          <Button label="GitHubアカウントでログイン" href="/auth/github" />
          <Button label="Googleアカウントでログイン" href="/auth/google" />
        </>
      );
    }
  })
);
