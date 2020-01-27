import React from "react";
import { GroupGroupInvitationList } from "../../lists/group-invitations/GroupGroupInvitationList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const GroupGroupInvitationsPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  return (
    <Page title="招待一覧">
      <GroupGroupInvitationList
        initialParams={{
          groupId
        }}
      />
    </Page>
  );
});
