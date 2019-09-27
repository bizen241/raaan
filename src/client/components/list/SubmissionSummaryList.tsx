import { TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import { ExerciseSummary, SubmissionSummary } from "../../../shared/api/entities";
import { createEntityList } from "../../enhancers/createEntityList";
import { useEntity } from "../../hooks/useEntity";
import { Column } from "../ui";

export const SubmissionSummaryList = createEntityList<SubmissionSummary>({ entityType: "SubmissionSummary" })(
  React.memo(({ entity: submissionSummary }) => {
    const { entity: exerciseSummary } = useEntity<ExerciseSummary>(
      "ExerciseSummary",
      submissionSummary.exerciseSummaryId
    );
    const title = exerciseSummary !== undefined ? exerciseSummary.title : "";

    return (
      <TableRow>
        <TableCell>
          <Column>{title}</Column>
        </TableCell>
      </TableRow>
    );
  })
);
