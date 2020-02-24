import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserGroupInvitationList } from "../../lists/group-invitations/UserGroupInvitationList";

export const UserGroupInvitationsPage = createPage()(
  React.memo(({ t }) => t("招待一覧")),
  React.memo(() => {
    const { currentUserId } = useCurrentUser();

    return (
      <UserGroupInvitationList
        initialParams={{
          targetId: currentUserId
        }}
      />
    );
  })
);
