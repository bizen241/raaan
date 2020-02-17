import { Email } from "@material-ui/icons";
import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserMessageList } from "../../lists/user-messages/UserMessageList";
import { Page } from "../../project/Page";
import { Button } from "../../ui";

export const UserMessagesPage = () => {
  const { currentUserId } = useCurrentUser();

  return (
    <Page title="通知一覧">
      <Button icon={<Email />} label="グループへの招待" to="/user/notifications/invitations" />
      <UserMessageList
        initialParams={{
          userId: currentUserId
        }}
      />
    </Page>
  );
};
