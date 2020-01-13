import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const ReportSummaryList = createEntityList("ReportSummary")(
  React.memo(({ entity: reportSummary }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/reports/${reportSummary.parentId}`}>
              <Typography>{reportSummary.state}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
