import { TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteGroupApplicationByOwnerDialog } from "../../dialogs/group-applications/DeleteGroupApplicationByOwnerDialog";
import { UploadGroupMemberByOwnerDialog } from "../../dialogs/group-members/UploadGroupMemberByOwnerDialog";
import { Column, Menu, MenuItem } from "../../ui";

export const GroupGroupApplicationList = createEntityList("GroupApplication")(
  React.memo(({ entity: groupApplication }) => {
    const [isUploadGroupMemberDialogOpen, onToggleUploadGroupMemberDialog] = useToggleState();
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entity: userSummary } = useEntity("UserSummary", groupApplication.applicantSummaryId);
    if (userSummary === undefined) {
      return null;
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
