import * as React from "react";
import { useContext } from "react";
import { UserMessageList } from "../../list/user-messages/UserMessageList";
import { UserContext } from "../../project/Context";
import { Page } from "../../ui/Page";

export const UserUserMessagesPage = () => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="通知一覧">
      <UserMessageList
        initialParams={{
          userId: currentUser.id
        }}
      />
    </Page>
  );
};
