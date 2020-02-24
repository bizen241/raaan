import { Email, Inbox, Link, Send } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useToggleState } from "../../../hooks/useToggleState";
import { GroupInvitationsDialog } from "../../dialogs/groups/GroupInvitationsDialog";
import { Button } from "../../ui";

export const GroupInvitePage = createPage<"Group">()(
  React.memo(({ t }) => t("グループへの招待")),
  React.memo(({ entityId: groupId }) => {
    const [isGroupInvitationDialogOpen, toggleGroupInvitationDialog] = useToggleState();

    return (
      <>
        <Button icon={<Link />} label="リンクで招待" to={`/groups/${groupId}/invite/link`} />
        <Button icon={<Email />} label="フォロワーを招待" onClick={toggleGroupInvitationDialog} />
        <Button icon={<Inbox />} label="申請一覧" to={`/groups/${groupId}/invite/applications`} />
        <Button icon={<Send />} label="招待一覧" to={`/groups/${groupId}/invite/invitations`} />
        <GroupInvitationsDialog
          groupId={groupId}
          isOpen={isGroupInvitationDialogOpen}
          onClose={toggleGroupInvitationDialog}
        />
      </>
    );
  })
);
