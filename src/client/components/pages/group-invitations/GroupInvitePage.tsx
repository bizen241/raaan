import { Email, Inbox, Link, Send } from "@material-ui/icons";
import React from "react";
import { useToggleState } from "../../../hooks/useToggleState";
import { GroupInvitationsDialog } from "../../dialogs/groups/GroupInvitationsDialog";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const GroupInvitePage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;

  const [isGroupInvitationDialogOpen, toggleGroupInvitationDialog] = useToggleState();

  return (
    <Page title="グループへの招待">
      <Button icon={<Link />} label="リンクで招待" to={`/groups/${groupId}/invite/link`} />
      <Button icon={<Email />} label="フォロワーを招待" onClick={toggleGroupInvitationDialog} />
      <Button icon={<Inbox />} label="申請一覧" to={`/groups/${groupId}/invite/applications`} />
      <Button icon={<Send />} label="招待一覧" to={`/groups/${groupId}/invite/invitations`} />
      <GroupInvitationsDialog
        groupId={groupId}
        isOpen={isGroupInvitationDialogOpen}
        onClose={toggleGroupInvitationDialog}
      />
    </Page>
  );
});
