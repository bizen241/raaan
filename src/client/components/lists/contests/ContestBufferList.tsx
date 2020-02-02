import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteContestBufferDialog } from "../../dialogs/contests/DeleteContestBufferDialog";
import { Column, IconButton } from "../../ui";

export const ContestBufferList = createBufferList("Contest")(
  React.memo(({ bufferId, buffer, source }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/contests/${bufferId}/edit`}>
              <Typography>{buffer.title || (source && source.title) || "無名のセッション"}</Typography>
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton icon={Delete} onClick={onToggleDeleteDialog} />
        </TableCell>
        <DeleteContestBufferDialog bufferId={bufferId} isOpen={isDeleteDialogOpen} onClose={onToggleDeleteDialog} />
      </TableRow>
    );
  })
);
