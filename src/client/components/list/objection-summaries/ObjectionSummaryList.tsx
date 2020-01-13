import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const ObjectionSummaryList = createEntityList("ObjectionSummary")(
  React.memo(({ entity: objectionSummary }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/objections/${objectionSummary.parentId}`}>
              <Typography>{objectionSummary.state}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
