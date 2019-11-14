import { Email, Inbox, Link, Send } from "@material-ui/icons";
import * as React from "react";
import { useGroupMemberPermission } from "../../../hooks/useGroupMemberPermission";
import { useToggleState } from "../../../hooks/useToggleState";
import { GroupInvitationsDialog } from "../../dialogs/groups/GroupInvitationsDialog";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const GroupInvitePage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  const [isGroupInvitationDialogOpen, toggleGroupInvitationDialog] = useToggleState();

  const groupMemberPermission = useGroupMemberPermission(groupId);
  const isGroupOwner = groupMemberPermission === "owner";

  return (
    <Page title="グループへの招待">
      {isGroupOwner && <Button icon={<Link />} label="リンクで招待" to={`/groups/${groupId}/group-secret`} />}
      {isGroupOwner && <Button icon={<Email />} label="フォロワーを招待" onClick={toggleGroupInvitationDialog} />}
      {isGroupOwner && <Button icon={<Send />} label="招待一覧" to={`/groups/${groupId}/group-invitations`} />}
      {isGroupOwner && <Button icon={<Inbox />} label="申請一覧" to={`/groups/${groupId}/group-applications`} />}
      <GroupInvitationsDialog
        groupId={groupId}
        isOpen={isGroupInvitationDialogOpen}
        onClose={toggleGroupInvitationDialog}
      />
    </Page>
  );
});
