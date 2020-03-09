import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteGroupApplicationDialog } from "../../dialogs/group-applications/DeleteGroupApplicationDialog";
import { Menu, MenuItem, TableRow } from "../../ui";

export const UserGroupApplicationList = createEntityList("GroupApplication")(
  React.memo(({ entity: groupApplication }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entity: groupSummary } = useEntity("GroupSummary", groupApplication.groupSummaryId);

    return (
      <TableRow
        action={
          <Menu>
            <MenuItem icon={<Delete />} label="削除" onClick={onToggleDeleteDialog} />
          </Menu>
        }
      >
        <Typography>{groupSummary && groupSummary.name}</Typography>
        <DeleteGroupApplicationDialog
          groupApplicationId={groupApplication.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
