import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseReport } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { Column } from "../../ui";

export const ExerciseReportList = createEntityList<ExerciseReport>({ entityType: "ExerciseReport" })(
  React.memo(({ entity: exerciseReport }) => {
    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/exercise-reports/${exerciseReport.id}`}>
              <Typography>{exerciseReport.reason}</Typography>
            </Link>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
