import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column } from "../../ui";

export const ObjectionCommentList = createEntityList("ObjectionComment")(
  React.memo(({ entity: objectionComment }) => {
    const { entity: authorSummary } = useEntity("UserSummary", objectionComment.authorId);
    if (authorSummary === undefined) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/users/${objectionComment.authorId}`}>
              <Typography>{authorSummary.name}</Typography>
            </Link>
            <Typography>{objectionComment.body}</Typography>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
