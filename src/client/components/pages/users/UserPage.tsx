import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserViewer } from "../../viewers/UserViewer";

export const UserPage = createPage<"User">()(
  React.memo(({ entityId: userId, t }) => {
    const { currentUser } = useCurrentUser();
    const isOwn = currentUser.id === userId;

    return isOwn ? t("マイページ") : t("ユーザーの詳細");
  }),
  React.memo(({ entityId: userId }) => {
    return <UserViewer userId={userId} />;
  })
);
