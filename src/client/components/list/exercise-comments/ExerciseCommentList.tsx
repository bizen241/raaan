import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column } from "../../ui";

export const ExerciseCommentList = createEntityList("ExerciseComment")(
  React.memo(({ entity: exerciseComment }) => {
    const { entity: authorSummary } = useEntity("UserSummary", exerciseComment.authorId);
    if (authorSummary === undefined) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/users/${exerciseComment.authorId}`}>
              <Typography>{authorSummary.name}</Typography>
            </Link>
            <Typography>{exerciseComment.body}</Typography>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
