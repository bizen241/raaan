import { Typography } from "@material-ui/core";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Link, TableRow } from "../../ui";

export const SuggestionCommentList = createEntityList("SuggestionComment")(
  React.memo(({ entity: suggestionComment }) => {
    const { entity: authorSummary } = useEntity("UserSummary", suggestionComment.authorId);

    return (
      <TableRow>
        <Link to={`/users/${suggestionComment.authorId}`} label={authorSummary.name} />
        <Typography>{suggestionComment.body}</Typography>
      </TableRow>
    );
  })
);
