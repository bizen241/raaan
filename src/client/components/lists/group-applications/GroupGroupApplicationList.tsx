import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteGroupApplicationByOwnerDialog } from "../../dialogs/group-applications/DeleteGroupApplicationByOwnerDialog";
import { UploadGroupMemberByOwnerDialog } from "../../dialogs/group-members/UploadGroupMemberByOwnerDialog";
import { Column, Menu, MenuItem, TableRow } from "../../ui";

export const GroupGroupApplicationList = createEntityList("GroupApplication")(
  React.memo(({ entity: groupApplication }) => {
    const [isUploadGroupMemberDialogOpen, onToggleUploadGroupMemberDialog] = useToggleState();
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entity: userSummary } = useEntity("UserSummary", groupApplication.applicantSummaryId);

    return (
      <TableRow
        action={
          <Menu>
            <MenuItem icon={<Delete />} label="拒絶" onClick={onToggleDeleteDialog} />
          </Menu>
        }
      >
        <Column onClick={onToggleUploadGroupMemberDialog}>
          <Typography>{userSummary && userSummary.name}</Typography>
        </Column>
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
