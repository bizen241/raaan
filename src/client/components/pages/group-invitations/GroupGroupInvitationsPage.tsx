import * as React from "react";
import { GroupGroupInvitationList } from "../../list/group-invitations/GroupGroupInvitationList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

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
