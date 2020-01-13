import React, { useContext } from "react";
import { UserGroupInvitationList } from "../../list/group-invitations/UserGroupInvitationList";
import { UserContext } from "../../project/Context";
import { Page } from "../../ui/Page";

export const UserGroupInvitationsPage = () => {
  const currentUser = useContext(UserContext);

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
