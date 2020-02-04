import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserGroupInvitationList } from "../../lists/group-invitations/UserGroupInvitationList";
import { Page } from "../../project/Page";

export const UserGroupInvitationsPage = () => {
  const currentUser = useCurrentUser();

  return (
    <Page title="招待一覧">
      <UserGroupInvitationList
        initialParams={{
          targetId: currentUser.id
        }}
      />
    </Page>
  );
};
