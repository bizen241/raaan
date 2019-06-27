import { Box, TableCell } from "@material-ui/core";
import * as React from "react";
import { EntityList, EntityListItemProps, EntityListProps } from ".";
import { ExerciseSummary, SubmissionSummary } from "../../../../shared/api/entities";
import { useEntity } from "../../../hooks/search";

export const SubmissionSummaryList = React.memo<EntityListProps<SubmissionSummary>>(props => {
  return <EntityList {...props} entityType="SubmissionSummary" itemComponent={SubmissionSummaryListItem} />;
});

const SubmissionSummaryListItem = React.memo<EntityListItemProps<SubmissionSummary>>(
  ({ entity: submissionSummary }) => {
    const { entity: exerciseSummary } = useEntity<ExerciseSummary>(
      "ExerciseSummary",
      submissionSummary.exerciseSummaryId
    );
    const title = exerciseSummary !== undefined ? exerciseSummary.title : "";

    return (
      <>
        <TableCell>
          <Box display="flex" flexDirection="column">
            {title}
          </Box>
        </TableCell>
      </>
    );
  }
);
