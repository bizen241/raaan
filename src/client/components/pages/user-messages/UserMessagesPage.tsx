import { Email } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { UserMessageList } from "../../list/user-messages/UserMessageList";
import { UserContext } from "../../project/Context";
import { Button } from "../../ui";
import { Page } from "../../ui/Page";

export const UserMessagesPage = () => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="通知一覧">
      <Button icon={<Email />} label="グループへの招待" to="/user/notifications/invitations" />
      <UserMessageList
        initialParams={{
          userId: currentUser.id
        }}
      />
    </Page>
  );
};
