import { TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteGroupApplicationDialog } from "../../dialogs/group-applications/DeleteGroupApplicationDialog";
import { Column, Menu, MenuItem } from "../../ui";

export const UserGroupApplicationList = createEntityList("GroupApplication")(
  React.memo(({ entity: groupApplication }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entity: groupSummary } = useEntity("GroupSummary", groupApplication.groupSummaryId);
    if (groupSummary === undefined) {
      return null;
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
