import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummary, SubmissionSummary } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column } from "../../ui";

export const ReminderList = createEntityList<SubmissionSummary>({ entityType: "SubmissionSummary" })(
  React.memo(({ entity: submissionSummary }) => {
    const { entity: exerciseSummary } = useEntity<ExerciseSummary>(
      "ExerciseSummary",
      submissionSummary.exerciseSummaryId
    );
    if (exerciseSummary === undefined) {
      return null;
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link
              color="textPrimary"
              underline="always"
              component={RouterLink}
              to={`/exercises/${exerciseSummary.exerciseId}`}
            >
              <Typography>{exerciseSummary.title || "無題"}</Typography>
            </Link>
            <Typography>{new Date(submissionSummary.remindAt).toLocaleString()}</Typography>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
