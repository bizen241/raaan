import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column } from "../../ui";

export const SuggestionCommentList = createEntityList("SuggestionComment")(
  React.memo(({ entity: suggestionComment }) => {
    const { entity: authorSummary } = useEntity("UserSummary", suggestionComment.authorId);
    if (authorSummary === undefined) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/users/${suggestionComment.authorId}`}>
              <Typography>{authorSummary.name}</Typography>
            </Link>
            <Typography>{suggestionComment.body}</Typography>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
