import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserEditor } from "../../editors/UserEditor";

export const EditUserPage = createPage<"User">()(
  React.memo(({ entityId: userId, t }) => {
    const { currentUserId } = useCurrentUser();

    const isOwn = currentUserId === userId;

    return isOwn ? t("プロフィールの設定") : t("ユーザーの編集");
  }),
  React.memo(({ entityId: userId }) => {
    return <UserEditor userId={userId} />;
  })
);
