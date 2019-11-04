import * as React from "react";
import { useContext } from "react";
import { UserSessionList } from "../../list/UserSessionList";
import { UserContext } from "../../project/Context";
import { Page } from "../../ui/Page";

export const UserUserSessionsPage = () => {
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
