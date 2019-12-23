import { Email } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useSearch } from "../../../hooks/useSearch";
import { GroupMemberList, GroupMemberPermissionContext } from "../../list/group-members/GroupMemberList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const GroupMembersPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  const currentUser = useContext(UserContext);

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
