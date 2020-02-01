import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete, Refresh } from "@material-ui/icons";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteGroupApplicationDialog } from "../../dialogs/group-applications/DeleteGroupApplicationDialog";
import { Column, Menu, MenuItem } from "../../ui";

export const UserGroupApplicationList = createEntityList("GroupApplication")(
  React.memo(({ entity: groupApplication, onReload }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entity: groupSummary } = useEntity("GroupSummary", groupApplication.groupSummaryId, false);
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
        <TableCell>
          <Column>
            <Typography>{groupSummary && groupSummary.name}</Typography>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <Menu>
            <MenuItem icon={<Delete />} label="削除" onClick={onToggleDeleteDialog} />
          </Menu>
        </TableCell>
        <DeleteGroupApplicationDialog
          groupApplicationId={groupApplication.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
