import { IconButton, Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createBufferList } from "../../../enhancers/createBufferList";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteSuggestionCommentBufferDialog } from "../../dialogs/suggestion-comments/DeleteSuggestionCommentBufferDialog";
import { Column } from "../../ui";

export const SuggestionCommentBufferList = createBufferList("SuggestionComment")(
  React.memo(({ bufferId, buffer, source = {} }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const targetId = source.targetId || buffer.targetId;
    if (targetId === undefined) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/suggestion/${targetId}/comments`}>
              <Typography>{buffer.body || (source && source.body) || ""}</Typography>
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <IconButton onClick={onToggleDeleteDialog}>
            <Delete />
          </IconButton>
        </TableCell>
        <DeleteSuggestionCommentBufferDialog
          bufferId={bufferId}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
