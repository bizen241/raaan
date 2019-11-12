import { Email, Inbox } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { GroupMember } from "../../../../shared/api/entities";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { GroupInvitationsDialog } from "../../dialogs/groups/GroupInvitationsDialog";
import { GroupMemberList } from "../../list/group-members/GroupMemberList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const GroupGroupMembersPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  const currentUser = useContext(UserContext);

  const [isGroupInvitationDialogOpen, toggleGroupInvitationDialog] = useToggleState();

  const { entities: groupMembers } = useSearch<GroupMember>("GroupMember", {
    groupId,
    userId: currentUser.id
  });
  const groupMember = groupMembers[0];
  const isGroupOwner = groupMember && groupMember.permission === "owner";

  return (
    <Page title="メンバーの一覧">
      {isGroupOwner && <Button icon={<Email />} label="フォロワーを招待" onClick={toggleGroupInvitationDialog} />}
      {isGroupOwner && <Button icon={<Inbox />} label="招待一覧" to={`/groups/${groupId}/group-invitations`} />}
      <GroupMemberList initialParams={{ groupId }} isGroupOwner={isGroupOwner} />
      <GroupInvitationsDialog
        groupId={groupId}
        isOpen={isGroupInvitationDialogOpen}
        onClose={toggleGroupInvitationDialog}
      />
    </Page>
  );
});
