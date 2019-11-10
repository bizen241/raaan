import * as React from "react";
import { GroupMemberList } from "../../list/group-members/GroupMemberList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const GroupGroupMembersPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  return (
    <Page title="メンバーの一覧">
      <GroupMemberList initialParams={{ groupId }} />
    </Page>
  );
});
