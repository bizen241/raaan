import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column } from "../../ui";

export const ReminderList = createEntityList("SubmissionSummary")(
  React.memo(({ entity: submissionSummary }) => {
    const { entity: exerciseSummary } = useEntity("ExerciseSummary", submissionSummary.exerciseSummaryId);
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
