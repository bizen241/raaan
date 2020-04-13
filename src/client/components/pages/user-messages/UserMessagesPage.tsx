import { Email } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserMessageList } from "../../lists/user-messages/UserMessageList";
import { Button } from "../../ui";

export const UserMessagesPage = createPage()(
  React.memo(({ t }) => t("通知一覧")),
  React.memo(() => {
    const { currentUser } = useCurrentUser();

    return (
      <>
        <Button icon={<Email />} label="グループへの招待" to="/user/notifications/invitations" />
        <UserMessageList
          initialParams={{
            userId: currentUser.id,
          }}
        />
      </>
    );
  })
);
