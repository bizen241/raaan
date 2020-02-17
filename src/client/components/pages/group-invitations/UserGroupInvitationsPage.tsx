import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserGroupInvitationList } from "../../lists/group-invitations/UserGroupInvitationList";
import { Page } from "../../project/Page";

export const UserGroupInvitationsPage = () => {
  const { currentUserId } = useCurrentUser();

  return (
    <Page title="招待一覧">
      <UserGroupInvitationList
        initialParams={{
          targetId: currentUserId
        }}
      />
    </Page>
  );
};
