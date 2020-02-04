import { Email } from "@material-ui/icons";
import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { GroupMemberList, GroupMemberPermissionContext } from "../../lists/group-members/GroupMemberList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const GroupMembersPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  const currentUser = useCurrentUser();

  const { entities: groupMembers } = useSearch("GroupMember", {
    groupId,
    userId: currentUser.id
  });
  const groupMember = groupMembers[0];
  const groupMemberPermission = groupMember !== undefined ? groupMember.permission : "guest";

  const isGroupOwner = groupMemberPermission === "owner";

  return (
    <Page title="グループのメンバー">
      {isGroupOwner && <Button icon={<Email />} label="グループへの招待" to={`/groups/${groupId}/invite`} />}
      <GroupMemberPermissionContext.Provider value={groupMemberPermission}>
        <GroupMemberList initialParams={{ groupId }} />
      </GroupMemberPermissionContext.Provider>
    </Page>
  );
});
