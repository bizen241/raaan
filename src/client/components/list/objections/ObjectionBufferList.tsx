import { IconButton, Link, TableCell, TableRow } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteObjectionBufferDialog } from "../../dialogs/objections/DeleteObjectionBufferDialog";
import { Column } from "../../ui";

export const ObjectionBufferList = createBufferList("Objection")(
  React.memo(({ bufferId, buffer, source }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/objections/${bufferId}/edit`}>
              {buffer.targetId || (source && source.targetId)}
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton onClick={onToggleDeleteDialog}>
            <Delete />
          </IconButton>
        </TableCell>
        <DeleteObjectionBufferDialog bufferId={bufferId} isOpen={isDeleteDialogOpen} onClose={onToggleDeleteDialog} />
      </TableRow>
    );
  })
);
