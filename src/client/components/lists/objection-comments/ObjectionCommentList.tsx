import { IconButton, Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column } from "../../ui";

export const ObjectionCommentList = createEntityList("ObjectionComment")(
  React.memo(({ entity: objectionComment, onReload }) => {
    const { entity: authorSummary } = useEntity("UserSummary", objectionComment.authorId, false);
    if (authorSummary === undefined) {
      return (
        <Column>
          <IconButton onClick={onReload}>
            <Refresh />
          </IconButton>
        </Column>
      );
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
