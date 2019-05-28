import { Link } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { BufferList, BufferListItemProps } from ".";
import { Exercise } from "../../../../shared/api/entities";
import { Column } from "../../ui";

export const ExerciseBufferList = React.memo(() => {
  return <BufferList entityType="Exercise" itemComponent={EditorBufferListItem} />;
});

const EditorBufferListItem = React.memo<BufferListItemProps<Exercise>>(({ bufferId, buffer }) => {
  return (
    <Column>
      <Link color="textPrimary" component={RouterLink} to={`/exercises/${bufferId}/edit`}>
        {buffer.edited.title || "無題"}
      </Link>
    </Column>
  );
});
