import { Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { Column, IconButton } from "../../ui";

export const SubmissionSummaryList = createEntityList("SubmissionSummary")(
  React.memo(({ entity: submissionSummary }) => {
    const { entity: exerciseSummary, onReload } = useEntity("ExerciseSummary", submissionSummary.exerciseSummaryId);
    if (exerciseSummary === undefined) {
      return (
        <Column>
          <IconButton icon={Refresh} onClick={onReload} />
        </Column>
      );
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
            <Typography>{new Date(submissionSummary.updatedAt).toLocaleString()}</Typography>
          </Column>
        </TableCell>
      </TableRow>
    );
  })
);
