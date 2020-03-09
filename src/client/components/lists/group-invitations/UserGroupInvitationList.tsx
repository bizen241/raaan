import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { RejectGroupInvitationDialog } from "../../dialogs/group-invitations/DeleteGroupInvitationDialog";
import { UploadGroupMemberDialog } from "../../dialogs/group-members/UploadGroupMemberDialog";
import { Column, Menu, MenuItem, TableRow } from "../../ui";

export const UserGroupInvitationList = createEntityList("GroupInvitation")(
  React.memo(({ entity: groupInvitation }) => {
    const [isUploadGroupMemberDialogOpen, onToggleUploadGroupMemberDialog] = useToggleState();
    const [isRejectDialogOpen, onToggleRejectDialog] = useToggleState();

    const { entity: groupSummary } = useEntity("GroupSummary", groupInvitation.groupSummaryId);

    return (
      <TableRow
        action={
          <Menu>
            <MenuItem icon={<Delete />} label="辞退" onClick={onToggleRejectDialog} />
          </Menu>
        }
      >
        <Column onClick={onToggleUploadGroupMemberDialog}>
          <Typography>{groupSummary.name}</Typography>
        </Column>
        <UploadGroupMemberDialog
          groupId={groupSummary.groupId}
          groupInvitationId={groupInvitation.id}
          isOpen={isUploadGroupMemberDialogOpen}
          onClose={onToggleUploadGroupMemberDialog}
        />
        <RejectGroupInvitationDialog
          groupInvitationId={groupInvitation.id}
          isOpen={isRejectDialogOpen}
          onClose={onToggleRejectDialog}
        />
      </TableRow>
    );
  })
);
