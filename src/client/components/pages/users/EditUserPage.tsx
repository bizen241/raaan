import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserEditor } from "../../editors/UserEditor";

export const EditUserPage = createPage<"User">()(
  React.memo(({ entityId: userId, t }) => {
    const { currentUser } = useCurrentUser();

    const isOwn = currentUser.id === userId;

    return isOwn ? t("プロフィールの設定") : t("ユーザーの編集");
  }),
  React.memo(({ entityId: userId }) => {
    return <UserEditor userId={userId} />;
  })
);
