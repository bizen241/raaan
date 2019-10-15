import * as React from "react";
import { useContext } from "react";
import { UserSessionList } from "../list/UserSessionList";
import { UserContext } from "../project/Context";
import { Page } from "../ui/Page";

export const SecurityPage = () => {
  const currentUser = useContext(UserContext);

  return (
    <Page>
      <UserSessionList
        title="セッション一覧"
        initialParams={{
          userId: currentUser.id
        }}
      />
    </Page>
  );
};
