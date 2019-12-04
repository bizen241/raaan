import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Report } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const ReportList = createEntityList<Report>({ entityType: "Report" })(
  React.memo(({ entity: report }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/reports/${report.id}`}>
              <Typography>{report.reason}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
