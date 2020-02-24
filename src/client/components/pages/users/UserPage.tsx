import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserViewer } from "../../viewers/UserViewer";

export const UserPage = createPage<"User">()(
  React.memo(({ entityId: userId, t }) => {
    const { currentUserId } = useCurrentUser();
    const isOwn = currentUserId === userId;

    return isOwn ? t("マイページ") : t("ユーザーの詳細");
  }),
  React.memo(({ entityId: userId }) => {
    return <UserViewer userId={userId} />;
  })
);
