import { Box, IconButton, Link, TableCell } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { EntityList, EntityListItemProps, EntityListProps } from ".";
import { ExerciseSummary } from "../../../../shared/api/entities";
import { UserContext } from "../../project/Context";

export const ExerciseList = React.memo<EntityListProps<ExerciseSummary>>(props => {
  return <EntityList {...props} entityType="ExerciseSummary" itemComponent={ExerciseListItem} />;
});

const ExerciseListItem = React.memo<EntityListItemProps<ExerciseSummary>>(({ entity: exerciseSummary }) => {
  const currentUser = React.useContext(UserContext);

  return (
    <>
      <TableCell>
        <Box display="flex" flexDirection="column">
          <Link color="textPrimary" component={RouterLink} to={`/exercises/${exerciseSummary.exerciseId}`}>
            {exerciseSummary.title || "無題"}
          </Link>
        </Box>
      </TableCell>
      {exerciseSummary.authorId === currentUser.id ? (
        <TableCell padding="checkbox">
          <IconButton component={RouterLink} to={`/exercises/${exerciseSummary.exerciseId}/edit`}>
            <Edit />
          </IconButton>
        </TableCell>
      ) : null}
    </>
  );
});
