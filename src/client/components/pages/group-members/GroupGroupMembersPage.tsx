import { Email } from "@material-ui/icons";
import * as React from "react";
import { useToggleState } from "../../../hooks/useToggleState";
import { GroupInvitationsDialog } from "../../dialogs/groups/GroupMembersDialog";
import { GroupMemberList } from "../../list/group-members/GroupMemberList";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const GroupGroupMembersPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  const [isGroupInvitationDialogOpen, toggleGroupInvitationDialog] = useToggleState();

  return (
    <Page title="メンバーの一覧">
      <Button icon={<Email />} label="フォロワーを招待" onClick={toggleGroupInvitationDialog} />
      <GroupMemberList initialParams={{ groupId }} />
      <GroupInvitationsDialog
        groupId={groupId}
        isOpen={isGroupInvitationDialogOpen}
        onClose={toggleGroupInvitationDialog}
      />
    </Page>
  );
});
