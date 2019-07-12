import { Box, IconButton, TableCell, TableRow, TextField } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { Tag } from "../../../../shared/api/entities";

export const TagEditor = React.memo<{
  tagIndex: number;
  tag: Tag;
  onUpdate: (tagIndex: number, value: string) => void;
  onDelete: (tagIndex: number) => void;
}>(({ tagIndex, tag, onUpdate, onDelete }) => {
  const updateTag = useCallback((e: React.ChangeEvent<HTMLInputElement>) => onUpdate(tagIndex, e.target.value), [
    tagIndex
  ]);
  const deleteTag = useCallback(() => onDelete(tagIndex), [tagIndex]);

  return (
    <TableRow>
      <TableCell padding="none">
        <Box display="flex" flexDirection="column" py={1}>
          <TextField variant="outlined" defaultValue={tag.name} onChange={updateTag} />
        </Box>
      </TableCell>
      <TableCell padding="checkbox">
        <IconButton onClick={deleteTag}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
});
