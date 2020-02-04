import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserSessionList } from "../../lists/user-sessions/UserSessionList";
import { Page } from "../../project/Page";

export const UserSessionsPage = () => {
  const currentUser = useCurrentUser();

  return (
    <Page title="セッション一覧">
      <UserSessionList
        initialParams={{
          userId: currentUser.id
        }}
      />
    </Page>
  );
};
