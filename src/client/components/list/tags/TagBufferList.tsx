import { IconButton, Link, TableCell, TableRow } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteTagBufferDialog } from "../../dialogs/tags/DeleteTagBufferDialog";
import { Column } from "../../ui";

export const TagBufferList = createBufferList("Tag")(
  React.memo(({ bufferId, source }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/tags/${bufferId}/edit`}>
              {source && source.name}
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton onClick={onToggleDeleteDialog}>
            <Delete />
          </IconButton>
        </TableCell>
        <DeleteTagBufferDialog bufferId={bufferId} isOpen={isDeleteDialogOpen} onClose={onToggleDeleteDialog} />
      </TableRow>
    );
  })
);
