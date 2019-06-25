import { Box, Link } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { BufferList, BufferListItemProps, BufferListProps } from ".";
import { Exercise } from "../../../../shared/api/entities";

export const ExerciseBufferList = React.memo<BufferListProps>(props => {
  return <BufferList {...props} entityType="Exercise" itemComponent={EditorBufferListItem} />;
});

const EditorBufferListItem = React.memo<BufferListItemProps<Exercise>>(({ bufferId, buffer }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Link color="textPrimary" component={RouterLink} to={`/exercises/${bufferId}/edit`}>
        {buffer.edited.title || "無題"}
      </Link>
    </Box>
  );
});
