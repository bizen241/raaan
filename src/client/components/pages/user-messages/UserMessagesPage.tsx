import { Email } from "@material-ui/icons";
import React, { useContext } from "react";
import { UserMessageList } from "../../lists/user-messages/UserMessageList";
import { UserContext } from "../../project/Context";
import { Page } from "../../project/Page";
import { Button } from "../../ui";

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
