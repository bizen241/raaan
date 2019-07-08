import { Box, IconButton, TableCell, TableRow, TextField } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Exercise, Tag } from "../../../../shared/api/entities";
import { actions } from "../../../reducers";

export const TagEditor = React.memo<{
  exerciseId: string;
  tagIndex: number;
  tag: Tag;
}>(({ exerciseId, tagIndex, tag }) => {
  const dispatch = useDispatch();

  const onDelete = useCallback(
    () => dispatch(actions.buffers.deleteArrayItem<Exercise>("Exercise", exerciseId, "tags", tagIndex)),
    [tagIndex]
  );
  const onUpdate = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      dispatch(
        actions.buffers.updateArrayItem<Exercise>("Exercise", exerciseId, "tags", tagIndex, {
          name: e.target.value
        })
      ),
    [tagIndex]
  );

  return (
    <TableRow>
      <TableCell padding="none">
        <Box display="flex" flexDirection="column" py={1}>
          <TextField variant="outlined" defaultValue={tag.name} onChange={onUpdate} />
        </Box>
      </TableCell>
      <TableCell padding="checkbox">
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});
