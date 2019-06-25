import { Box, IconButton, TableCell } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { EntityList, EntityListItemProps, EntityListProps } from ".";
import { ExerciseSummary, SubmissionSummary } from "../../../../shared/api/entities";
import { useEntity } from "../../../hooks/search";
import { UserContext } from "../../project/Context";

export const SubmissionSummaryList = React.memo<EntityListProps<SubmissionSummary>>(props => {
  return <EntityList {...props} entityType="SubmissionSummary" itemComponent={SubmissionSummaryListItem} />;
});

const SubmissionSummaryListItem = React.memo<EntityListItemProps<SubmissionSummary>>(
  ({ entity: submissionSummary }) => {
    const currentUser = useContext(UserContext);

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
        {submissionSummary.userId === currentUser.id ? (
          <TableCell padding="checkbox">
            <IconButton>
              <Delete />
            </IconButton>
          </TableCell>
        ) : null}
      </>
    );
  }
);
