import { IconButton, Link, TableCell, TableRow } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteSuggestionBufferDialog } from "../../dialogs/suggestions/DeleteSuggestionBufferDialog";
import { Column } from "../../ui";

export const SuggestionBufferList = createBufferList("Suggestion")(
  React.memo(({ bufferId, buffer, source }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/suggestions/${bufferId}/edit`}>
              {buffer.state || (source && source.state)}
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton onClick={onToggleDeleteDialog}>
            <Delete />
          </IconButton>
        </TableCell>
        <DeleteSuggestionBufferDialog bufferId={bufferId} isOpen={isDeleteDialogOpen} onClose={onToggleDeleteDialog} />
      </TableRow>
    );
  })
);
