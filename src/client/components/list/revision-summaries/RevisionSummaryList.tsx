import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const RevisionSummaryList = createEntityList("RevisionSummary")(
  React.memo(({ entity: revisionSummary }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/revisions/${revisionSummary.revisionId}`}>
              <Typography>{revisionSummary.messageSubject || "件名なし"}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
