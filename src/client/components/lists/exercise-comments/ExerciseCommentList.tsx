import { Typography } from "@material-ui/core";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Link, TableRow } from "../../ui";

export const ExerciseCommentList = createEntityList("ExerciseComment")(
  React.memo(({ entity: exerciseComment }) => {
    const { entity: authorSummary } = useEntity("User", exerciseComment.authorId);

    return (
      <TableRow>
        <Link label={authorSummary.name} to={`/users/${exerciseComment.authorId}`} />
        <Typography>{exerciseComment.body}</Typography>
      </TableRow>
    );
  })
);
