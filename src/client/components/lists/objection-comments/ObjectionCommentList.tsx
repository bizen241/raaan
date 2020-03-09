import { Typography } from "@material-ui/core";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Link, TableRow } from "../../ui";

export const ObjectionCommentList = createEntityList("ObjectionComment")(
  React.memo(({ entity: objectionComment }) => {
    const { entity: authorSummary } = useEntity("UserSummary", objectionComment.authorId);

    return (
      <TableRow>
        <Link label={authorSummary.name} to={`/users/${objectionComment.authorId}`} />
        <Typography>{objectionComment.body}</Typography>
      </TableRow>
    );
  })
);
