import { Link } from "@material-ui/core";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { EntityList, EntityListItemProps, EntityListProps } from ".";
import { ExerciseSummary } from "../../../../shared/api/entities";
import { Column } from "../../ui";

export const ExerciseList = React.memo<EntityListProps<ExerciseSummary>>(props => {
  return <EntityList {...props} entityType="ExerciseSummary" itemComponent={ExerciseListItem} />;
});

const ExerciseListItem = React.memo<EntityListItemProps<ExerciseSummary>>(({ entity: exerciseSummary }) => {
  return (
    <Column>
      <Link color="textPrimary" component={RouterLink} to={`/exercises/${exerciseSummary.exerciseId}/edit`}>
        {exerciseSummary.title || "無題"}
      </Link>
    </Column>
  );
});
