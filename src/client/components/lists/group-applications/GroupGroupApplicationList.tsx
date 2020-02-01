import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete, Refresh } from "@material-ui/icons";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteGroupApplicationByOwnerDialog } from "../../dialogs/group-applications/DeleteGroupApplicationByOwnerDialog";
import { UploadGroupMemberByOwnerDialog } from "../../dialogs/group-members/UploadGroupMemberByOwnerDialog";
import { Column, Menu, MenuItem } from "../../ui";

export const GroupGroupApplicationList = createEntityList("GroupApplication")(
  React.memo(({ entity: groupApplication, onReload }) => {
    const [isUploadGroupMemberDialogOpen, onToggleUploadGroupMemberDialog] = useToggleState();
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entity: userSummary } = useEntity("UserSummary", groupApplication.applicantSummaryId, false);
    if (userSummary === undefined) {
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
            <Typography>{userSummary && userSummary.name}</Typography>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <Menu>
            <MenuItem icon={<Delete />} label="拒絶" onClick={onToggleDeleteDialog} />
          </Menu>
        </TableCell>
        <UploadGroupMemberByOwnerDialog
          groupId={groupApplication.groupId}
          applicantId={groupApplication.applicantId}
          groupApplicationId={groupApplication.id}
          isOpen={isUploadGroupMemberDialogOpen}
          onClose={onToggleUploadGroupMemberDialog}
        />
        <DeleteGroupApplicationByOwnerDialog
          groupApplicationId={groupApplication.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
