import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column } from "../../ui";

export const ReportCommentList = createEntityList("ReportComment")(
  React.memo(({ entity: reportComment }) => {
    const { entity: authorSummary } = useEntity("UserSummary", reportComment.authorId);
    if (authorSummary === undefined) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/users/${reportComment.authorId}`}>
              <Typography>{authorSummary.name}</Typography>
            </Link>
            <Typography>{reportComment.body}</Typography>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
