import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserSessionList } from "../../lists/user-sessions/UserSessionList";

export const UserSessionsPage = createPage()(
  React.memo(({ t }) => t("セッション一覧")),
  React.memo(() => {
    const { currentUserId } = useCurrentUser();

    return (
      <UserSessionList
        initialParams={{
          userId: currentUserId
        }}
      />
    );
  })
);
