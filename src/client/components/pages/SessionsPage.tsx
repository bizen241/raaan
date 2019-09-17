import * as React from "react";
import { useContext } from "react";
import { UserSessionList } from "../list/search/UserSessionList";
import { UserContext } from "../project/Context";
import { Page } from "../ui/Page";

export const SessionsPage = () => {
  const currentUser = useContext(UserContext);

  return (
    <Page>
      <UserSessionList
        title="セッション一覧"
        initialSearchParams={{
          userId: currentUser.id
        }}
      />
    </Page>
  );
};
