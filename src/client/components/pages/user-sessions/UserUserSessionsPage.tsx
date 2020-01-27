import React, { useContext } from "react";
import { UserSessionList } from "../../lists/user-sessions/UserSessionList";
import { UserContext } from "../../project/Context";
import { Page } from "../../project/Page";

export const UserSessionsPage = () => {
  const currentUser = useContext(UserContext);

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
