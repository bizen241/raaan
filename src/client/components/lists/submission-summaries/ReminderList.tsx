import { Typography } from "@material-ui/core";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Link, TableRow } from "../../ui";

export const ReminderList = createEntityList("SubmissionSummary")(
  React.memo(({ entity: submissionSummary }) => {
    const { entity: exerciseSummary } = useEntity("ExerciseSummary", submissionSummary.exerciseSummaryId);

    return (
      <TableRow>
        <Link label={exerciseSummary.title || "無題"} to={`/exercises/${exerciseSummary.exerciseId}`} />
        <Typography>{new Date(submissionSummary.remindAt).toLocaleString()}</Typography>
      </TableRow>
    );
  })
);
