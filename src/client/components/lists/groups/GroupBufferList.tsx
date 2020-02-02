import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteGroupBufferDialog } from "../../dialogs/groups/DeleteGroupBufferDialog";
import { Column, IconButton } from "../../ui";

export const GroupBufferList = createBufferList("Group")(
  React.memo(({ bufferId, buffer, source }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/groups/${bufferId}/edit`}>
              <Typography>{buffer.name || (source && source.name) || "無名のグループ"}</Typography>
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton icon={Delete} onClick={onToggleDeleteDialog} />
        </TableCell>
        <DeleteGroupBufferDialog bufferId={bufferId} isOpen={isDeleteDialogOpen} onClose={onToggleDeleteDialog} />
      </TableRow>
    );
  })
);
