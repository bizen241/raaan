import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete, Refresh } from "@material-ui/icons";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { RejectGroupInvitationDialog } from "../../dialogs/group-invitations/DeleteGroupInvitationDialog";
import { UploadGroupMemberDialog } from "../../dialogs/group-members/UploadGroupMemberDialog";
import { Column, Menu, MenuItem } from "../../ui";

export const UserGroupInvitationList = createEntityList("GroupInvitation")(
  React.memo(({ entity: groupInvitation, onReload }) => {
    const [isUploadGroupMemberDialogOpen, onToggleUploadGroupMemberDialog] = useToggleState();
    const [isRejectDialogOpen, onToggleRejectDialog] = useToggleState();

    const { entity: groupSummary } = useEntity("GroupSummary", groupInvitation.groupSummaryId);
    if (groupSummary === undefined) {
      return (
        <Column>
          <IconButton onClick={onReload}>
            <Refresh />
          </IconButton>
        </Column>
      );
    }

    return (
      <TableRow hover>
        <TableCell onClick={onToggleUploadGroupMemberDialog}>
          <Column>
            <Typography>{groupSummary && groupSummary.name}</Typography>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <Menu>
            <MenuItem icon={<Delete />} label="辞退" onClick={onToggleRejectDialog} />
          </Menu>
        </TableCell>
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
